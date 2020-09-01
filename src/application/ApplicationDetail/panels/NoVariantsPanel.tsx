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
import { Config, UpsConfig } from '../../../utils/Config';

interface Props {
  app?: PushApplication;
  onCreateNew: () => void;
}

interface State {
  docLinks?: UpsConfig;
}

export class NoVariantsPanel extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    this.setState({ docLinks: await Config.getInstance().getDocsConfig() });
  }

  render = () => {
    const getLink = (key: string, section = 'DOCS_LINKS') => {
      const docLinks = this.state.docLinks as Record<
        string,
        Record<string, string>
      >;

      return docLinks?.[section]?.[key] || '#';
    };

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
          <a href={getLink('add-variant')}>documentation</a>.
        </EmptyStateBody>
        <Button
          variant="primary"
          icon={<PlusIcon />}
          onClick={this.props.onCreateNew}
        >
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
