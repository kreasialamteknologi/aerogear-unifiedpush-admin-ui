import React, { Component, ReactNode } from 'react';
import { CodeBranchIcon } from '@patternfly/react-icons';
import {
  EmptyState,
  EmptyStateVariant,
  EmptyStateIcon,
  Title,
  EmptyStateBody,
  Bullseye,
  Button,
  WizardContextConsumer,
} from '@patternfly/react-core';
import { PushApplication } from '@aerogear/unifiedpush-admin-client';
import { VariantSelectionForm } from '../VariantForms/VariantSelectionForm';
import { Config, UpsConfig } from '../../utils/Config';

interface State {
  variantName: string;
  variantSelectionForm: boolean;
  docLinks?: UpsConfig;
}

interface Props {
  app?: PushApplication;
  close?: () => void;
}

export class CreateVariantPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      variantName: '',
      variantSelectionForm: false,
    };
  }

  async componentDidMount() {
    this.setState({ docLinks: await Config.getInstance().getDocsConfig() });
  }

  render(): React.ReactNode {
    const getLink = (key: string, section = 'DOCS_LINKS') => {
      const docLinks = this.state.docLinks as Record<
        string,
        Record<string, string>
      >;

      return docLinks?.[section]?.[key] || '#';
    };

    return (
      <>
        <EmptyState variant={EmptyStateVariant.full}>
          <EmptyStateIcon icon={CodeBranchIcon} />
          <Title headingLevel="h5" size="lg">
            Create a Variant for {this.props.app!.name}
          </Title>
          <EmptyStateBody>
            The first step to set up your mobile device is to add a variants.
            That will generate the code necessary to register UPS on your
            device. Learn more about variants in the{' '}
            <a href={getLink('getting-started#running')}> documentation </a>
          </EmptyStateBody>
          <Bullseye>
            <Button
              variant="primary"
              onClick={() => this.setState({ variantSelectionForm: true })}
            >
              Create Variant
            </Button>
          </Bullseye>
          <WizardContextConsumer>
            {({ onNext }) => (
              <VariantSelectionForm
                open={this.state.variantSelectionForm}
                close={() => this.setState({ variantSelectionForm: false })}
                app={this.props.app}
                onFinished={onNext}
              />
            )}
          </WizardContextConsumer>
        </EmptyState>
      </>
    );
  }
}
