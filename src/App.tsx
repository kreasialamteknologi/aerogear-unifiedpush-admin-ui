import React from 'react';
import { Component } from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.css';
import {
  UnifiedPushAdminClient,
  PushApplication,
} from '@aerogear/unifiedpush-admin-client';
import { Page } from '@patternfly/react-core';
import { Welcome } from './landing/Welcome';
import Header from './common/Header';

interface MyState {
  applications?: PushApplication[];
}

export class App extends Component<{}, MyState> {
  constructor(props: {}) {
    super(props);
    this.state = {};
  }

  readonly upsadm = new UnifiedPushAdminClient('http://localhost:9999');

  componentDidMount = (): void => {
    this.upsadm.applications.find().then(apps => {
      this.setState({
        applications: apps,
      });
    });
  };

  render = (): React.ReactElement => (
    <Page header={<Header />}>
      <Welcome applications={this.state.applications} />
    </Page>
  );
}

// tslint:disable-next-line:no-default-export
export default App;
