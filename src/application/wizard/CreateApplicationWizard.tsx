import React, { ReactNode } from 'react';
import { Component } from 'react';
import { CreateApplicationPage } from '../crud/CreateApplicationPage';
import { CreateVariantPage } from '../crud/CreateVariantPage';
import {
  Wizard,
  WizardContextConsumer,
  WizardStep,
} from '@patternfly/react-core';
import {
  PushApplication,
  AndroidVariant,
} from '@aerogear/unifiedpush-admin-client';
import { SetupPage } from './SetupPage';
import {
  ApplicationListContext,
  ContextInterface,
} from '../../context/Context';

interface Props {
  open: boolean;
  close: () => void;
}

interface State {
  app?: PushApplication;
  stepIdReached: number;
}

export class CreateApplicationWizard extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      stepIdReached: 1,
    };
  }

  render(): React.ReactNode {
    const { stepIdReached } = this.state;
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
        }) => <CreateVariantPage app={this.state.app!} />}
      </WizardContextConsumer>
    );

    const setupPage = (
      <ApplicationListContext.Consumer>
        {({ selectedVariant }: ContextInterface): ReactNode => {
          return (
            <WizardContextConsumer>
              {({
                activeStep,
                goToStepByName,
                goToStepById,
                onNext,
                onBack,
                onClose,
              }) => (
                <SetupPage
                  app={this.state.app!}
                  variant={selectedVariant! as AndroidVariant}
                  onFinished={onNext}
                />
              )}
            </WizardContextConsumer>
          );
        }}
      </ApplicationListContext.Consumer>
    );

    const steps = [
      {
        id: 1,
        name: 'Create your first Application',
        component: createAppPage,
        nextButtonText: 'Next',
      },
      {
        id: 2,
        name: 'Create Application Variant',
        component: createVariantPage,
        canJumpTo: stepIdReached >= 2,
        nextButtonText: 'Next',
      },
      {
        id: 3,
        name: 'Mobile device: Set up variant',
        component: setupPage,
        canJumpTo: stepIdReached >= 3,
        nextButtonText: 'Next',
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
