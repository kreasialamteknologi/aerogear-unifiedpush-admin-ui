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
import { SetupPage } from './SetupPage';
import {
  ApplicationListContext,
  ContextInterface,
} from '../../context/Context';
import { SendTestNotificationPage } from './SendTestNotificationPage';
import { SetupSenderAPI } from './SetupSenderAPI';
import { WizardFinalPage } from './WizardFinalPage';

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
    const context = this.context as ContextInterface;
    const { stepIdReached } = this.state;

    const move = async (
      nextId: number,
      onNext: () => void,
      stateUpdate?: Partial<State>
    ) => {
      await this.setState({
        ...stateUpdate,
        stepIdReached:
          nextId > this.state.stepIdReached ? nextId : this.state.stepIdReached,
      });
      onNext();
    };

    const createAppPage = (
      <WizardContextConsumer>
        {({ onNext }) => (
          <CreateApplicationPage
            onFinished={async application =>
              move(2, onNext, { app: application })
            }
          />
        )}
      </WizardContextConsumer>
    );
    const createVariantPage = (
      <WizardContextConsumer>
        {({ onNext }) => (
          <CreateVariantPage
            app={this.state.app!}
            onFinished={() => move(3, onNext)}
          />
        )}
      </WizardContextConsumer>
    );

    const setupPage = (
      <WizardContextConsumer>
        {({ onNext }) => (
          <SetupPage
            app={this.state.app!}
            variant={context.selectedVariant!}
            onFinished={() => move(4, onNext)}
          />
        )}
      </WizardContextConsumer>
    );

    const sendTestNotificationPage = (
      <WizardContextConsumer>
        {({ onNext, onBack }) => (
          <SendTestNotificationPage
            app={this.state.app!}
            variant={context.selectedVariant!}
            onFinished={() => move(5, onNext)}
            onBack={() => move(4, onBack)}
          />
        )}
      </WizardContextConsumer>
    );

    const setupSenderAPI = (
      <WizardContextConsumer>
        {({ onNext }) => (
          <SetupSenderAPI
            app={this.state.app!}
            variant={context.selectedVariant!}
            onFinished={() => move(6, onNext)}
          />
        )}
      </WizardContextConsumer>
    );

    const finalPage = (
      <WizardContextConsumer>
        {({ onClose }) => <WizardFinalPage onClose={onClose} />}
      </WizardContextConsumer>
    );

    const steps = [
      {
        id: 1,
        name: 'Create your first Application',
        component: createAppPage,
        canJumpTo: true,
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
      {
        id: 4,
        name: 'Test! Send notification',
        component: sendTestNotificationPage,
        canJumpTo: stepIdReached >= 3,
        nextButtonText: 'Next',
      } as WizardStep,
      {
        id: 5,
        name: 'Backend: Set up sender API',
        component: setupSenderAPI,
        canJumpTo: stepIdReached >= 2,
        nextButtonText: 'Next',
      },
      {
        id: 6,
        name: 'Well done!',
        canJumpTo: stepIdReached >= 2,
        component: finalPage,
      },
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
CreateApplicationWizard.contextType = ApplicationListContext;
