import {
  PushApplication,
  Variant,
  WebPushVariant,
} from '@aerogear/unifiedpush-admin-client';
import React, { Component } from 'react';
import {
  Button,
  ButtonVariant,
  TextList,
  TextListItem,
  TextListItemVariants,
  TextListVariants,
} from '@patternfly/react-core';
import { EditIcon } from '@patternfly/react-icons';
import { EditWebPushNetworkOptions } from './EditWebPushNetworkOptions';

interface Props {
  app: PushApplication;
  variant: Variant;
  onRefresh: (variant: WebPushVariant) => void;
}

interface State {
  editNetworkOptions?: boolean;
}

export class WebPushVariantDetails extends Component<Props, State> {
  render = () => {
    if (this.props.variant.type !== 'web_push') {
      return null;
    }

    const variant = this.props.variant as WebPushVariant;

    return (
      <>
        <EditWebPushNetworkOptions
          visible={!!this.state?.editNetworkOptions}
          app={this.props.app}
          variant={variant}
          onCancel={() => this.setState({ editNetworkOptions: false })}
          onSaved={updatedVariant => {
            this.setState({ editNetworkOptions: false });
            this.props.onRefresh(updatedVariant as WebPushVariant);
          }}
        />
        <TextList component={TextListVariants.dl}>
          <TextListItem component={TextListItemVariants.dt}>
            Public Key:
          </TextListItem>
          <TextListItem component={TextListItemVariants.dd}>
            {variant.publicKey}
          </TextListItem>

          <TextListItem component={TextListItemVariants.dt}>
            Alias:
          </TextListItem>
          <TextListItem component={TextListItemVariants.dd}>
            {variant.alias}
          </TextListItem>

          <TextListItem component={TextListItemVariants.dd}>
            <Button
              className={'button-small'}
              icon={<EditIcon />}
              variant={ButtonVariant.secondary}
              onClick={() => this.setState({ editNetworkOptions: true })}
            >
              Edit Network Options
            </Button>
          </TextListItem>
        </TextList>
      </>
    );
  };
}
