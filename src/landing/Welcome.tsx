import React from 'react';
import { Component } from 'react';

import { WizardStep1 } from '../wizard/WizardStep1';

export class Welcome extends Component<{}> {
  render = (): React.ReactElement => {
    return <WizardStep1 />;
  };
}
