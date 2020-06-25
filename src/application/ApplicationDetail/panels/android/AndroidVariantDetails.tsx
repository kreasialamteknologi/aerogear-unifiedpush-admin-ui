import {
  AndroidVariant,
  PushApplication,
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
import { EditAndroidNetworkOptions } from '../dialogs/EditAndroidNetworkOptions';

interface Props {
  app: PushApplication;
  variant: AndroidVariant;
}

interface State {
  editNetworkOptions?: boolean;
}

export class AndroidVariantDetails extends Component<Props, State> {
  render = () => {
    if (this.props.variant.type !== 'android') {
      return null;
    }
    return (
      <>
        <EditAndroidNetworkOptions
          visible={!!this.state?.editNetworkOptions}
          app={this.props.app}
          variant={this.props.variant}
          onCancel={() => this.setState({ editNetworkOptions: false })}
          onSaved={() => this.setState({ editNetworkOptions: false })}
        />
        <TextList component={TextListVariants.dl}>
          <TextListItem component={TextListItemVariants.dt}>
            Sender ID:
          </TextListItem>
          <TextListItem component={TextListItemVariants.dd}>
            {this.props.variant.projectNumber}
          </TextListItem>
          <TextListItem component={TextListItemVariants.dt}>
            Server Key:
          </TextListItem>
          <TextListItem component={TextListItemVariants.dd}>
            {this.props.variant.googleKey}
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
