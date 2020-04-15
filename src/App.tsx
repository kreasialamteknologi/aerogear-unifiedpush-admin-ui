import React from 'react';
import { Component } from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './styles/App.css';
import { PushApplication } from '@aerogear/unifiedpush-admin-client';
import { Page, PageSection } from '@patternfly/react-core';
import { Welcome } from './landing/Welcome';
import { Header } from './common/Header';

interface MyState {
  applications?: PushApplication[];
}

export class App extends Component<{}, MyState> {
  constructor(props: {}) {
    super(props);
    this.state = {};
  }

  render = (): React.ReactElement => (
    <Page header={<Header />} style={{ flexGrow: 1, flexDirection: 'column' }}>
      <PageSection
        isFilled={true}
        variant={'light'}
        style={{ padding: '0 0 0 0' }}
      >
        <Welcome />
      </PageSection>
    </Page>
  );
}

// tslint:disable-next-line:no-default-export
export default App;
