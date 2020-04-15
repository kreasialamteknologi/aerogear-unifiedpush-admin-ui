import React from 'react';
import { Component } from 'react';

import { WizardStep1 } from '../wizard/WizardStep1';
import {
  PushApplication,
  PushApplicationSearchOptions,
  UnifiedPushAdminClient,
} from '@aerogear/unifiedpush-admin-client';
import { Spinner, Grid, GridItem, Bullseye } from '@patternfly/react-core';
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
        // TODO: this should be probably configured in some way
        'http://localhost:9999'
      ).applications.find({
        includeDeviceCount: true,
        includeActivity: true,
      } as PushApplicationSearchOptions);
      this.setState({ applications: apps, loading: false });
    } catch (err) {
      console.log('Error', err);
      this.setState({ loading: false }); // set some error
    }
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
