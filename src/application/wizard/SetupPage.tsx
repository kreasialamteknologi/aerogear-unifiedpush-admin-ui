import React, { Component } from 'react';
import {
  TextContent,
  Text,
  Button,
  Page,
  TextVariants,
  TextList,
  TextListItem,
  TextListVariants,
  Split,
  SplitItem,
  WizardContextConsumer,
} from '@patternfly/react-core';
import {
  PushApplication,
  AndroidVariant,
  WebPushVariant,
  IOSVariant,
  IOSTokenVariant,
  Variant,
} from '@aerogear/unifiedpush-admin-client';
import {
  ApplicationListContext,
  ContextInterface,
} from '../../context/Context';
import { AndroidCodeSnippets } from '../ApplicationDetail/panels/android/AndroidCodeSnippets';
import { WebPushCodeSnippets } from '../ApplicationDetail/panels/web_push/WebPushCodeSnippets';
import { IOSCertCodeSnippets } from '../ApplicationDetail/panels/ios_cert/iOSCertCodeSnippets';
import { IOSTokenCodeSnippets } from '../ApplicationDetail/panels/ios_token/iOSTokenCodeSnippets';
import { getLink as _getLink } from '../../utils/DocLinksUtils';
import { InstallationCount } from '../ApplicationDetail/InstallationsCount';

interface Props {
  app: PushApplication;
  variant: Variant;
  onFinished: () => void;
}

export class SetupPage extends Component<Props> {
  render(): React.ReactNode {
    const context = this.context as ContextInterface;
    const getLink = (key: string) => _getLink(context.upsConfig, key);

    const getIcon = () => {
      switch (this.props.variant.type) {
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

    const getCodeSnippet = () => {
      switch (this.props.variant.type) {
        case 'android':
          return (
            <AndroidCodeSnippets
              app={this.props.app}
              variant={this.props.variant as AndroidVariant}
            />
          );
        case 'web_push':
          return (
            <WebPushCodeSnippets
              app={this.props.app}
              variant={this.props.variant as WebPushVariant}
            />
          );
        case 'ios':
          return (
            <IOSCertCodeSnippets
              app={this.props.app}
              variant={this.props.variant as IOSVariant}
            />
          );
        case 'ios_token':
          return (
            <IOSTokenCodeSnippets
              app={this.props.app}
              variant={this.props.variant as IOSTokenVariant}
            />
          );
        default:
          return <></>;
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
                <Text
                  component={TextVariants.h1}
                >{`${this.props.app.name} :`}</Text>
              </SplitItem>
              <SplitItem>
                <InstallationCount
                  variant={this.props.variant}
                  app={this.props.app}
                  autoRefresh={true}
                  onNewInstallation={this.props.onFinished}
                />
              </SplitItem>
            </Split>
            <Text component={TextVariants.p}>
              We are half way there! Use the code snippet below to{' '}
              <Text
                component={TextVariants.a}
                href={getLink('register-device-android')}
              >
                {' '}
                register your device{' '}
              </Text>{' '}
              and allow it to receiving notifications through this UnifiedPush
              Server. If you don't know how to do this, go to the{' '}
              <Text
                component={TextVariants.a}
                href={getLink('step-by-step-android')}
              >
                documentation for full step by step explanation.
              </Text>
            </Text>
            <TextList component={TextListVariants.ol}>
              <TextListItem>
                Copy the code snippet and paste it on your device code.
              </TextListItem>
              <TextListItem>Build and deploy your app</TextListItem>
              <TextListItem>Click Next(below)</TextListItem>
            </TextList>
          </TextContent>
          {getCodeSnippet()}
          <TextContent>
            <Text component={TextVariants.p}>
              Next we are going to send a test notification. Make sure you {''}
              <Text
                component={TextVariants.a}
                href={getLink(`build-and-deploy-${this.props.variant.type}`)}
              >
                build or deploy your app
              </Text>
              after pasting the snippet.
            </Text>
          </TextContent>
        </Page>
        <WizardContextConsumer>
          {({ onNext }) => (
            <Button
              className={'setupPageButton'}
              variant="primary"
              onClick={onNext}
            >
              Next
            </Button>
          )}
        </WizardContextConsumer>
      </>
    );
  }
}
SetupPage.contextType = ApplicationListContext;
