import React from 'react';
import { Component } from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './styles/App.css';
import { Page, PageSection } from '@patternfly/react-core';
import { Welcome } from './landing/Welcome';
import { Header } from './common/Header';

import { ApplicationListContext, UpsAdminState } from './context/Context';
import { UpsClientFactory } from './utils/UpsClientFactory';

export class App extends Component<{}, UpsAdminState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      applications: [],
      loading: true,
      refresh: this.refresh,
    };
  }

  private readonly refresh = async () => {
    console.log('Refresh called');
    try {
      const searchResults = await UpsClientFactory.getUpsClient().applications.find();
      this.setState({
        applications: searchResults.appList,
        loading: false,
        error: undefined,
      });
    } catch (err) {
      this.setState({
        applications: [],
        loading: false,
        error: err,
      });
    }
  };

  async componentDidMount() {
    this.refresh();
  }

  render = (): React.ReactElement => (
    <ApplicationListContext.Provider value={this.state}>
      <Page
        header={<Header />}
        style={{ flexGrow: 1, flexDirection: 'column' }}
      >
        <PageSection
          isFilled={true}
          variant={'light'}
          style={{ padding: '0 0 0 0' }}
        >
          <Welcome />
        </PageSection>
      </Page>
    </ApplicationListContext.Provider>
  );
}

// tslint:disable-next-line:no-default-export
export default App;
