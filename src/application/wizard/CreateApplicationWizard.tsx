import React from 'react';
import { Component } from 'react';
import { CreateApplicationPage } from './CreateApplicationPage';
import { Wizard } from '@patternfly/react-core';

interface Props {
  open: boolean;
  close: () => void;
}

export class CreateApplicationWizard extends Component<Props> {
  render(): React.ReactNode {
    const steps = [
      {
        id: 1,
        name: 'Create your first Application',
        component: <CreateApplicationPage />,
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
        />
      );
    }

    return null;
  }
}
