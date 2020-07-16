import React from 'react';
import { Component } from 'react';
import { CreateApplicationPage } from '../crud/CreateApplicationPage';
import { CreateVariantPage } from '../crud/CreateVariantPage';
import {
  Wizard,
  WizardContextConsumer,
  WizardStep,
} from '@patternfly/react-core';
import { PushApplication } from '@aerogear/unifiedpush-admin-client';

interface Props {
  open: boolean;
  close: () => void;
}

interface State {
  app?: PushApplication;
}

export class CreateApplicationWizard extends Component<Props, State> {
  render(): React.ReactNode {
    const createAppPage = (
      <WizardContextConsumer>
        {({
          activeStep,
          goToStepByName,
          goToStepById,
          onNext,
          onBack,
          onClose,
        }) => (
          <CreateApplicationPage
            onFinished={application => {
              this.setState({ app: application });
              onNext();
            }}
          />
        )}
      </WizardContextConsumer>
    );
    const createVariantPage = (
      <WizardContextConsumer>
        {({
          activeStep,
          goToStepByName,
          goToStepById,
          onNext,
          onBack,
          onClose,
        }) => <CreateVariantPage onFinished={onNext} app={this.state.app} />}
      </WizardContextConsumer>
    );

    const steps = [
      {
        id: 1,
        name: 'Create your first Application',
        component: createAppPage,
        nextButtonText: 'next',
      },
      {
        id: 2,
        name: 'Create Application Variant',
        component: createVariantPage,
        nextButtonText: 'Finish',
      } as WizardStep,
    ];

    if (this.props.open) {
      return (
        <Wizard
          isOpen={this.props.open}
          onClose={this.props.close}
          title="Create Application"
          description="This wizard will guide you through all the steps required to create an application an its variants"
          steps={steps}
          footer={<></>}
        />
      );
    }

    return null;
  }
}
