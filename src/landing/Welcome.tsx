import React from "react";
import { Component } from "react";

import {
  PageHeader,
} from '@patternfly/react-core';

import WizardStep1 from '../wizard/WizardStep1'

export class Welcome extends Component<{}> {
  render = () : React.ReactElement  =>  {

    const header = (
      <PageHeader
        logo={
          <a className="navbar-brand" href="https://aerogear.org">
            <strong>AEROGEAR</strong> UNIFIEDPUSH SERVER
          </a>
        }
        showNavToggle={false}
        isNavOpen={true}
      />
    );

    return (
      <WizardStep1 />
    );
  }
}