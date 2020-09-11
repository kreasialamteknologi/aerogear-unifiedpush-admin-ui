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
import { getLink as _getLink } from '../../utils/DocLinksUtils';
import {
  ApplicationListContext,
  ContextInterface,
} from '../../context/Context';
import { ActivityLogPanel } from '../ApplicationDetail/panels/ActivityLogPanel';

interface State {
  variantName: string;
  variantSelectionForm: boolean;
}

interface Props {
  app?: PushApplication;
  onFinished: () => void;
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
    const context = this.context as ContextInterface;
    const getLink = (key: string) => _getLink(context.upsConfig, key);

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
                onFinished={this.props.onFinished}
              />
            )}
          </WizardContextConsumer>
        </EmptyState>
      </>
    );
  }
}
CreateVariantPage.contextType = ApplicationListContext;
