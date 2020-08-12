import React, { Component, ReactNode } from 'react';
import {
  Modal,
  TextContent,
  Text,
  Button,
  Page,
  TextVariants,
  TextList,
  TextListItem,
  TextListVariants,
  variantIcons,
} from '@patternfly/react-core';
import {
  PushApplication,
  AndroidVariant,
  Variant,
  WebPushVariant,
  IOSVariant,
  IOSTokenVariant,
} from '@aerogear/unifiedpush-admin-client';
import {
  ApplicationListContext,
  ContextInterface,
} from '../../context/Context';
import { AndroidCodeSnippets } from '../ApplicationDetail/panels/android/AndroidCodeSnippets';
import { WebPushCodeSnippets } from '../ApplicationDetail/panels/web_push/WebPushCodeSnippets';
import { IOSCertCodeSnippets } from '../ApplicationDetail/panels/ios_cert/iOSCertCodeSnippets';
import { IOSTokenCodeSnippets } from '../ApplicationDetail/panels/ios_token/iOSTokenCodeSnippets';

interface State {}

interface Props {
  app: PushApplication;
  variant: AndroidVariant;
  onFinished: () => void;
}

export class SetupPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render(): React.ReactNode {
    return (
      <>
        <Page>
          <TextContent>
            <Text component={TextVariants.h1}>{`${this.props.app.name}`}</Text>
            <Text component={TextVariants.p}>
              We are half way there! Use the code snippet below to{' '}
              <Text
                component={TextVariants.a}
                href="https://aerogear.org/docs/unifiedpush/aerogear-push-android/guides/#_registration_with_the_unifiedpush_server"
              >
                {' '}
                register your device{' '}
              </Text>{' '}
              and allow it to receiving notifications through this UnifiedPush
              Server. If you don't know how to do this, go to the{' '}
              <Text
                component={TextVariants.a}
                href="https://aerogear.org/docs/unifiedpush/aerogear-push-android/guides/"
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
          <ApplicationListContext.Consumer>
            {({ selectedVariant }: ContextInterface): ReactNode => {
              if (selectedVariant?.type === 'android') {
                return (
                  <AndroidCodeSnippets
                    app={this.props.app}
                    variant={selectedVariant! as AndroidVariant}
                  />
                );
              }
              if (selectedVariant?.type === 'web_push') {
                return (
                  <WebPushCodeSnippets
                    app={this.props.app}
                    variant={selectedVariant! as WebPushVariant}
                  />
                );
              }
              if (selectedVariant?.type === 'ios') {
                return (
                  <IOSCertCodeSnippets
                    app={this.props.app}
                    variant={selectedVariant! as IOSVariant}
                  />
                );
              }
              if (selectedVariant?.type === 'ios_token') {
                return (
                  <IOSTokenCodeSnippets
                    app={this.props.app}
                    variant={selectedVariant! as IOSTokenVariant}
                  />
                );
              }

              return () => {
                console.log('missing code snippets');
              };
            }}
          </ApplicationListContext.Consumer>
          <TextContent>
            <Text component={TextVariants.p}>
              Next we are going to send a test notification. Make sure you {''}
              <Text
                component={TextVariants.a}
                href="https://aerogear.org/docs/unifiedpush/aerogear-push-android/guides/#_handling_notification"
              >
                build or deploy your app
              </Text>
              after pasting the snippet.
            </Text>
          </TextContent>
        </Page>
        <Button
          className={'setupPageButton'}
          variant="primary"
          onClick={() => {}}
        >
          Next
        </Button>
      </>
    );
  }
}
