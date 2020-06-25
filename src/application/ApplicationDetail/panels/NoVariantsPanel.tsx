import { PushApplication } from '@aerogear/unifiedpush-admin-client';
import React, { Component } from 'react';
import {
  Button,
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  EmptyStateVariant,
  Title,
} from '@patternfly/react-core';
import { MobileAltIcon, PlusIcon } from '@patternfly/react-icons';

interface Props {
  app?: PushApplication;
}

export class NoVariantsPanel extends Component<Props> {
  render = () => {
    const noVariants = () => (
      <EmptyState variant={EmptyStateVariant.full}>
        <EmptyStateIcon icon={MobileAltIcon} />
        <Title headingLevel="h4" size="lg">
          There are no variants yet.
        </Title>
        <EmptyStateBody>
          The first step to set up your mobile device is to add a variants. That
          will generate the code necessary to register UPS on your device.
          <br />
          Learn more about variants in the{' '}
          <a href="https://aerogear.org/docs/unifiedpush/ups_userguide/index/#_create_and_manage_variants">
            documentation
          </a>
          .
        </EmptyStateBody>
        <Button variant="primary" icon={<PlusIcon />}>
          Add A Variant
        </Button>
      </EmptyState>
    );

    return this.props.app?.variants?.length &&
      this.props.app.variants.length > 0
      ? null
      : noVariants();
  };
}
