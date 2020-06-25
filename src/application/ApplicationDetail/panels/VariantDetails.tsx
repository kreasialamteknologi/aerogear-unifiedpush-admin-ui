import React, { Component } from 'react';
import {
  Variant,
  AndroidVariant,
  PushApplication,
} from '@aerogear/unifiedpush-admin-client';
import { RedoIcon } from '@patternfly/react-icons';
import {
  Button,
  ButtonVariant,
  Text,
  TextContent,
  TextList,
  TextListItem,
  TextListItemVariants,
  TextListVariants,
  TextVariants,
} from '@patternfly/react-core';
import { UpsClientFactory } from '../../../utils/UpsClientFactory';
import { RenewVariantSecret } from './dialogs/RenewVariantSecret';
import { AndroidVariantDetails } from './android/AndroidVariantDetails';
import { AndroidCodeSnippets } from './android/AndroidCodeSnippets';

interface Props {
  app: PushApplication;
  variant: AndroidVariant;
}

interface State {
  activeCodeSnippets: string;
  refreshSecret?: boolean;
  editNetworkOptions?: boolean;
}

export class VariantDetails extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      activeCodeSnippets: 'java',
    };
  }

  render = () => {
    const onRefreshed = (variant: Variant) => {
      this.props.variant.secret = variant.secret;
      this.setState({ refreshSecret: false });
    };

    return (
      <>
        <RenewVariantSecret
          visible={!!this.state.refreshSecret}
          app={this.props.app}
          variant={this.props.variant}
          onCancel={() => this.setState({ refreshSecret: false })}
          onRefreshed={onRefreshed}
        />
        <TextContent style={{ marginBottom: 20 }}>
          <Text component={TextVariants.small}>
            Firebase's Cloud Messaging Network (FCM) will be used. To learn more
            about FCM, visit our Android, Chrome or Apache Cordova guides for
            push.
          </Text>
          <TextList component={TextListVariants.dl}>
            <TextListItem component={TextListItemVariants.dt}>
              Server URL:
            </TextListItem>
            <TextListItem component={TextListItemVariants.dd}>
              {UpsClientFactory.getUPSServerURL()}
            </TextListItem>
            <TextListItem component={TextListItemVariants.dt}>
              Variant ID:
            </TextListItem>
            <TextListItem component={TextListItemVariants.dd}>
              {this.props.variant.variantID}
            </TextListItem>
            <TextListItem component={TextListItemVariants.dt}>
              Variant Secret:
            </TextListItem>
            <TextListItem component={TextListItemVariants.dd}>
              {this.props.variant.secret}
            </TextListItem>

            <TextListItem component={TextListItemVariants.dd}>
              <Button
                className={'button-small'}
                icon={<RedoIcon />}
                variant={ButtonVariant.secondary}
                onClick={() => this.setState({ refreshSecret: true })}
              >
                Renew Variant Secret
              </Button>
            </TextListItem>
          </TextList>

          <AndroidVariantDetails
            app={this.props.app}
            variant={this.props.variant}
          />
        </TextContent>
        <AndroidCodeSnippets
          app={this.props.app}
          variant={this.props.variant}
        />
      </>
    );
  };
}
