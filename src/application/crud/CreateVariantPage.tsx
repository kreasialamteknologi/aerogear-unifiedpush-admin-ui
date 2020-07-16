import React, { Component } from 'react';
import { CodeBranchIcon } from '@patternfly/react-icons';
import { UpsClientFactory } from '../../utils/UpsClientFactory';
import {
  EmptyState,
  EmptyStateVariant,
  EmptyStateIcon,
  Title,
  EmptyStateBody,
  Bullseye,
  Button,
} from '@patternfly/react-core';
import { PushApplication } from '@aerogear/unifiedpush-admin-client';
import { AndroidVariantForm } from '../VariantForms/AndroidVariantForm';
import { VariantSelectionForm } from '../VariantForms/VariantSelectionForm';

interface State {
  variantName: string;
  variantSelectionForm: boolean;
}

interface Props {
  app?: PushApplication;
  onFinished: () => void;
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

  render(): React.ReactNode {
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
            <a
              href={
                'https://docs.aerogear.org/aerogear/latest/getting-started-running.html#running'
              }
            >
              {' '}
              documentation{' '}
            </a>
          </EmptyStateBody>
          <Bullseye>
            <Button
              variant="primary"
              onClick={() => this.setState({ variantSelectionForm: true })}
            >
              Create Variant
            </Button>
          </Bullseye>
          <VariantSelectionForm
            open={this.state.variantSelectionForm}
            close={() => this.setState({ variantSelectionForm: false })}
            app={this.props.app}
          />
        </EmptyState>
      </>
    );
  }
}
