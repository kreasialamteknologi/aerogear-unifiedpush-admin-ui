import {
  AndroidVariant,
  PushApplication,
  Variant,
} from '@aerogear/unifiedpush-admin-client';
import React, { Component } from 'react';
import {
  Button,
  ButtonVariant,
  Label,
  TextList,
  TextListItem,
  TextListItemVariants,
  TextListVariants,
  Text,
  TextVariants,
  ClipboardCopy,
} from '@patternfly/react-core';
import { EditIcon } from '@patternfly/react-icons';
import { EditAndroidNetworkOptions } from './EditAndroidNetworkOptions';

interface Props {
  app: PushApplication;
  variant: Variant;
}

interface State {
  editNetworkOptions?: boolean;
}

export class AndroidVariantDetails extends Component<Props, State> {
  render = () => {
    if (this.props.variant.type !== 'android') {
      return null;
    }

    const variant = this.props.variant as AndroidVariant;

    return (
      <>
        <EditAndroidNetworkOptions
          visible={!!this.state?.editNetworkOptions}
          app={this.props.app}
          variant={variant}
          onCancel={() => this.setState({ editNetworkOptions: false })}
          onSaved={() => this.setState({ editNetworkOptions: false })}
        />
        <TextList component={TextListVariants.dl}>
          <TextListItem component={TextListItemVariants.dt}>
            Sender ID:
          </TextListItem>
          <TextListItem component={TextListItemVariants.dd}>
            {variant.projectNumber}
          </TextListItem>
          <TextListItem
            style={{ width: '100%' }}
            component={TextListItemVariants.dt}
          >
            Server Key:
          </TextListItem>
          <TextListItem component={TextListItemVariants.dd}>
            {variant.googleKey}
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
