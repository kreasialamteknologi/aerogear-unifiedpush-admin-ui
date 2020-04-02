import React from 'react';
import { Component } from 'react';
import { WizardStep1 } from '../wizard/WizardStep1';
import { PushApplication } from '@aerogear/unifiedpush-admin-client';
import { ApplicationHome } from '../application/ApplicationHome';

interface Props {
  applications?: PushApplication[];
}

export class Welcome extends Component<Props> {
  render = (): React.ReactElement => {
    return this.props.applications ? (
      <ApplicationHome applications={this.props.applications} />
    ) : (
      <WizardStep1 />
    );
  };
}
