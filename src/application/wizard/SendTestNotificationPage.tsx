import {
  AlertVariant,
  Button,
  ButtonVariant,
  Page,
  Split,
  SplitItem,
  Text,
  TextArea,
  TextContent,
  TextVariants,
  WizardContextConsumer,
} from '@patternfly/react-core';
import { InstallationCount } from '../ApplicationDetail/InstallationsCount';
import React, { useContext, useState } from 'react';
import {
  ApplicationListContext,
  ContextInterface,
} from '../../context/Context';
import { PushApplication, Variant } from '@aerogear/unifiedpush-admin-client';
import { getLink as _getLink } from '../../utils/DocLinksUtils';
import { CheckIcon } from '@patternfly/react-icons';
import { UpsClientFactory } from '../../utils/UpsClientFactory';

interface Props {
  app: PushApplication;
  variant: Variant;
}

export function SendTestNotificationPage(props: Props) {
  const context = useContext<ContextInterface>(ApplicationListContext);
  const [variantReady, setVariantReady] = useState<boolean>(
    (props.variant.metadata?.deviceCount || 0) > 0
  );
  const [testMessage, setTestMessage] = useState<string>(
    `Hello! This is my first notification to ${props.variant.name}`
  );

  const getLink = (key: string) => _getLink(context.upsConfig, key);
  const getIcon = () => {
    switch (props.variant.type) {
      case 'android':
        return 'fab fa-android fa-3x muted';
      case 'ios':
      case 'ios_token':
        return 'fab fa-apple fa-3x muted';
      case 'web_push':
        return 'fab fa-chrome fa-3x muted';
      default:
        return '';
    }
  };

  const buildVariantContent = (
    <>
      <Text component={TextVariants.p}>
        <b>Build your app!</b> you need a recipient to send the test
        notification. You can go back to get instructions on how to build your
        app or skip this and continue with the wizard.
      </Text>
      <Text component={TextVariants.p}>
        You can always
        <Text component={TextVariants.a}> Skip the wizard </Text> altogether if
        you want.
      </Text>
    </>
  );

  const variantReadyContent = (
    <Text component={TextVariants.p}>
      <b>Excellent!</b> Now lets test by sending a notification and see if
      everything adds up.
    </Text>
  );

  const sendTestMessage = async () => {
    const agSender = require('unifiedpush-node-sender');

    try {
      const client = await agSender({
        url: UpsClientFactory.getUPSServerURL().trim(),
        applicationId: props.app.pushApplicationID,
        masterSecret: props.app.masterSecret,
      });

      await client.sender.send(
        {
          alert: testMessage,
          priority: 'normal',
        },
        {}
      );
      context.alert(
        'Test message sent successfully',
        [],
        AlertVariant.success,
        8000
      );
    } catch (err) {
      context.alert(err);
    }
  };

  return (
    <>
      <Page>
        <TextContent>
          <Split style={{ alignItems: 'center' }}>
            <SplitItem>
              <i className={getIcon()} />
            </SplitItem>
            <SplitItem>
              <Text component={TextVariants.h1}>{`${props.app.name} :`}</Text>
            </SplitItem>
            <SplitItem>
              <InstallationCount
                variant={props.variant}
                app={props.app}
                autoRefresh={!variantReady}
                onNewInstallation={() => setVariantReady(true)}
                deviceInstalledComponent={
                  <Text
                    style={{ paddingLeft: 20, color: 'green' }}
                    component={TextVariants.small}
                  >
                    <b>
                      <CheckIcon /> Successful installation
                    </b>
                  </Text>
                }
              />
            </SplitItem>
          </Split>
          {variantReady ? variantReadyContent : buildVariantContent}
        </TextContent>
      </Page>
      <Text component={TextVariants.p}>
        <b>Message</b>
      </Text>
      <TextArea
        disabled={!variantReady}
        defaultValue={`Hello! This is my first notification to ${props.variant.name}`}
        onChange={value => setTestMessage(value)}
      />
      <WizardContextConsumer>
        {({ onNext, onBack }) => {
          if (variantReady) {
            return (
              <Button
                className={'setupPageButton'}
                variant="primary"
                onClick={async () => {
                  await sendTestMessage();
                  onNext();
                }}
              >
                Send Push Notification And Continue
              </Button>
            );
          }
          return (
            <>
              <Button
                className={'setupPageButton'}
                variant="primary"
                onClick={onBack}
              >
                Back To Variant Set Up
              </Button>
              <Button variant={ButtonVariant.link} onClick={onNext}>
                Skip This Step
              </Button>
            </>
          );
        }}
      </WizardContextConsumer>
    </>
  );
}
