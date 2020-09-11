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
import { Secret } from '../../common/Secret';
import { getLink as _getLink } from '../../utils/DocLinksUtils';
import {
  ApplicationListContext,
  ContextInterface,
} from '../../context/Context';
import { SenderApiSnippets } from './senderapi-snippets-panel/SenderApiSnippets';

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
    const context = this.context as ContextInterface;
    const getLink = (key: string) => _getLink(context.upsConfig, key);

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
        <SenderApiSnippets app={this.props.app} />
      </>
    );
  };
}
SenderAPI.contextType = ApplicationListContext;
