import {
  IOSTokenVariant,
  PushApplication,
  Variant,
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
import { EditIOSTokenNetworkOptions } from './EditIOSTokenNetworkOptions';

interface Props {
  app: PushApplication;
  variant: Variant;
}

interface State {
  editNetworkOptions?: boolean;
}

export class IOSTokenVariantDetails extends Component<Props, State> {
  render = () => {
    if (this.props.variant.type !== 'ios_token') {
      return null;
    }

    const variant = this.props.variant as IOSTokenVariant;

    return (
      <>
        <EditIOSTokenNetworkOptions
          visible={!!this.state?.editNetworkOptions}
          app={this.props.app}
          variant={variant}
          onCancel={() => this.setState({ editNetworkOptions: false })}
          onSaved={() => this.setState({ editNetworkOptions: false })}
        />
        <TextList component={TextListVariants.dl}>
          <TextListItem component={TextListItemVariants.dt}>Type:</TextListItem>
          <TextListItem component={TextListItemVariants.dd}>
            {variant.production ? 'Production' : 'Development'}
          </TextListItem>

          <TextListItem component={TextListItemVariants.dt}>
            Bundle ID:
          </TextListItem>
          <TextListItem component={TextListItemVariants.dd}>
            {variant.bundleId}
          </TextListItem>

          <TextListItem component={TextListItemVariants.dt}>
            Key ID:
          </TextListItem>
          <TextListItem component={TextListItemVariants.dd}>
            {variant.keyId}
          </TextListItem>

          <TextListItem component={TextListItemVariants.dt}>
            Team ID:
          </TextListItem>
          <TextListItem component={TextListItemVariants.dd}>
            {variant.teamId}
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
