import React from 'react';
import { Component } from 'react';
import { CreateApplicationPage } from '../crud/CreateApplicationPage';
import {
  Wizard,
  WizardContextConsumer,
  WizardStep,
} from '@patternfly/react-core';

interface Props {
  open: boolean;
  close: () => void;
}

export class CreateApplicationWizard extends Component<Props> {
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
        }) => <CreateApplicationPage onFinished={onNext} />}
      </WizardContextConsumer>
    );

    const steps = [
      {
        id: 1,
        name: 'Create your first Application',
        component: createAppPage,
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
