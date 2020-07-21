import {
  IOSVariant,
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
import { EditIOSCertNetworkOptions } from './EditIOSCertNetworkOptions';

interface Props {
  app: PushApplication;
  variant: Variant;
}

interface State {
  editNetworkOptions?: boolean;
}

export class IOSCertVariantDetails extends Component<Props, State> {
  render = () => {
    if (this.props.variant.type !== 'ios') {
      return null;
    }

    const variant = this.props.variant as IOSVariant;

    return (
      <>
        <EditIOSCertNetworkOptions
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
