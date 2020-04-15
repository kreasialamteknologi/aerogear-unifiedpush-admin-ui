import React, { ReactNode } from 'react';
import { Component } from 'react';
import { ApplicationListConsumer } from '../context/Context';

import { WizardStep1 } from '../wizard/WizardStep1';
<<<<<<< HEAD
=======
import {
  PushApplication,
  PushApplicationSearchOptions,
  UnifiedPushAdminClient,
} from '@aerogear/unifiedpush-admin-client';
>>>>>>> Added application list page
import { Spinner, Grid, GridItem, Bullseye } from '@patternfly/react-core';
import { ApplicationList } from './ApplicationList';
import { GeneralStats } from './GeneralStats';

<<<<<<< HEAD
export class Welcome extends Component<{}> {
=======
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

>>>>>>> Added application list page
  render = () => {
    return (
      <ApplicationListConsumer>
        {({ applications, loading }): ReactNode => {
          if (loading) {
            return (
              <Bullseye>
                <Spinner />
              </Bullseye>
            );
          }
          if (applications.length > 0) {
            return (
              <Grid style={{ height: '100%' }}>
                <GridItem sm={8} md={9}>
                  <ApplicationList apps={applications} />
                </GridItem>
                <GridItem
                  sm={4}
                  md={3}
                  style={{
                    backgroundColor: '#F9F9F9',
                    borderLeft: 'solid 1px #C5C5C5',
                  }}
                >
                  <GeneralStats apps={applications} />
                </GridItem>
              </Grid>
            );
          } else {
            return <WizardStep1 />;
          }
        }}
      </ApplicationListConsumer>
    );
  };
}
