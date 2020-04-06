import React from 'react';
import { Component } from 'react';

import { WizardStep1 } from '../wizard/WizardStep1';
import {
  PushApplication,
  UnifiedPushAdminClient,
} from '@aerogear/unifiedpush-admin-client';
import {
  PageSection,
  Spinner,
  Grid,
  GridItem,
  Title,
  Bullseye,
  Split,
  SplitItem,
  Divider,
  DataList,
} from '@patternfly/react-core';
import { ApplicationList } from './ApplicationList';
import { GeneralStats } from './GeneralStats';

interface State {
  applications: PushApplication[];
  loading: boolean;
}

export class Welcome extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      applications: [],
      loading: true,
    };
  }

  async componentDidMount() {
    try {
      const apps = await new UnifiedPushAdminClient(
        'http://localhost:9999'
      ).applications.find();
      this.setState({ applications: apps, loading: false });
    } catch (err) {
      console.log('Error', err);
      this.setState({ loading: false }); // set some error
    }
  }

  componentWillUnmount(): void {
    console.log('unmounting');
  }

  render = () => {
    if (this.state.loading) {
      return (
        <Bullseye>
          <Spinner />
        </Bullseye>
      );
    }
    if (this.state.applications.length > 0) {
      return (
        <Grid style={{ height: '100%' }}>
          <GridItem sm={8} md={9}>
            <ApplicationList apps={this.state.applications} />
          </GridItem>
          <GridItem
            sm={4}
            md={3}
            style={{
              backgroundColor: '#F9F9F9',
              borderLeft: 'solid 1px #C5C5C5',
            }}
          >
            <GeneralStats apps={this.state.applications} />
          </GridItem>
        </Grid>
      );
    } else {
      return <WizardStep1 />;
    }
  };
}
