import React, { Component } from 'react';
import { PushApplication } from '@aerogear/unifiedpush-admin-client';
import { Title } from '../../common/Title';
import {
  Alert,
  Button,
  ButtonVariant,
  Tab,
  Tabs,
  Text,
  TextContent,
  TextList,
  TextListItem,
  TextListItemVariants,
  TextListVariants,
} from '@patternfly/react-core';
import { RedoIcon } from '@patternfly/react-icons';
import { UpsClientFactory } from '../../utils/UpsClientFactory';
import { RenewApplicationSecret } from './panels/dialogs/RenewApplicationSecret';
import { CodeSnippet } from './CodeSnippet';
import { snippet as java_snippet } from './snippets/sender/java';
import { snippet as node_snippet } from './snippets/sender/node';
import { snippet as curl_snippet } from './snippets/sender/curl';
import { links } from '../../links';
import { Secret } from '../../common/Secret';

interface State {
  refreshSecret: boolean;
  activeTab: string;
}
interface Props {
  app: PushApplication;
}
export class SenderAPI extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      refreshSecret: false,
      activeTab: 'java-sender-api',
    };
  }

  readonly render = () => {
    const onRefreshed = (app: PushApplication) => {
      this.props.app.masterSecret = app.masterSecret;
      this.setState({ refreshSecret: false });
    };

    const onTabSelect = (tabKey: string) => {
      this.setState({ activeTab: tabKey });
    };

    return (
      <>
        <RenewApplicationSecret
          visible={this.state.refreshSecret}
          app={this.props.app}
          onCancel={() => this.setState({ refreshSecret: false })}
          onRefreshed={onRefreshed}
        />
        <Title>Sending push notifications</Title>
        <Text component={'small'}>
          Make your backend server send push notifications through this
          UnifiedPush Server using supported sender APIs.
        </Text>
        <TextContent style={{ marginTop: 20, marginBottom: 20 }}>
          <TextList component={TextListVariants.dl}>
            <TextListItem component={TextListItemVariants.dt}>
              Server URL:
            </TextListItem>
            <TextListItem component={TextListItemVariants.dd}>
              {UpsClientFactory.getUPSServerURL()}
            </TextListItem>
            <TextListItem component={TextListItemVariants.dt}>
              Application ID:
            </TextListItem>
            <TextListItem component={TextListItemVariants.dd}>
              {this.props.app.pushApplicationID}
            </TextListItem>
            <TextListItem component={TextListItemVariants.dt}>
              Master Secret:
            </TextListItem>
            <TextListItem component={TextListItemVariants.dd}>
              <Secret text={this.props.app.masterSecret} />
            </TextListItem>

            <TextListItem component={TextListItemVariants.dd}>
              <Button
                className={'button-small'}
                icon={<RedoIcon />}
                variant={ButtonVariant.secondary}
                onClick={() => this.setState({ refreshSecret: true })}
              >
                Renew Master Secret
              </Button>
            </TextListItem>
          </TextList>
        </TextContent>
        <Alert variant="warning" title="Keep this info secure!">
          Never expose your Master Secret or Application ID publicly.
        </Alert>
        <Tabs
          style={{ marginTop: 20 }}
          activeKey={this.state.activeTab}
          isBox={false}
          onSelect={(evt, key) => onTabSelect(key as string)}
        >
          <Tab eventKey={'java-sender-api'} title="Java Sender API">
            <Title headingLevel={'h1'}>Set up Java UPS Sender API</Title>
            <Text component={'small'}>
              First add{' '}
              <code className={'code'}>unifiedpush-java-client.jar</code> as a{' '}
              <a href={'links.pushApplications.senderAPI.docs.java_client'}>
                dependency to your Java project
              </a>
              .
              <p>
                Then use the following snippet in your Java code to enable push
                notification sending.
              </p>
            </Text>
            <CodeSnippet
              app={this.props.app}
              language={'java'}
              snippet={java_snippet}
            />
            <Text component={'small'}>
              Read more on the details of the{' '}
              <a href={links.pushApplications.senderAPI.docs.java_client}>
                Java UPS Sender API in documentation
              </a>
              .
              <p>
                If you have questions about this process,{' '}
                <a href={'links.pushApplications.senderAPI.docs.java_client'}>
                  visit the documentation for full step by step explanation
                </a>
                .
              </p>
            </Text>
          </Tab>
          <Tab eventKey={'node-sender-api'} title="Node.js Sender API">
            <Title headingLevel={'h1'}>Set up Node.js Sender API</Title>
            <Text component={'small'}>
              First add <code className={'code'}>unifiedpush-jnode-sender</code>{' '}
              as a{' '}
              <a href={links.pushApplications.senderAPI.docs.node_client}>
                dependency to your project
              </a>
              .
              <p>
                Then use the following snippet in your Node.js code to enable
                push notification sending.
              </p>
            </Text>
            <CodeSnippet
              app={this.props.app}
              language={'javascript'}
              snippet={node_snippet}
            />
            <Text component={'small'}>
              Read more on the details of the{' '}
              <a href={links.pushApplications.senderAPI.docs.node_client}>
                Node.js UPS Sender API in documentation
              </a>
              .
            </Text>
          </Tab>
          <Tab eventKey={'rest-sender-api'} title="REST Sender API (with CURL)">
            <Title headingLevel={'h1'}>
              Use UPS REST Sender API (with CURL)
            </Title>
            <Text component={'small'}>
              If none of the official client libs suit you or you just want to
              simply try out the notification sending, you can use the REST API
              directly.
              <p>
                Run the following <code className={'code'}>curl</code> command
                in a shell to send a notification to UPS server.
              </p>
            </Text>
            <CodeSnippet
              app={this.props.app}
              language={'bash'}
              snippet={curl_snippet}
            />
          </Tab>
        </Tabs>
      </>
    );
  };
}
