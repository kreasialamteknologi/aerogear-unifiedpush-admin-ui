import React, { ReactNode } from 'react';
import { Component } from 'react';
import { ApplicationListConsumer } from '../context/Context';

import { WizardStep1 } from '../wizard/WizardStep1';
import {
  Spinner,
  Grid,
  GridItem,
  Bullseye,
  EmptyState,
  EmptyStateVariant,
} from '@patternfly/react-core';
import { ApplicationList } from './ApplicationList';
import { GeneralStats } from './GeneralStats';

export class Welcome extends Component<{}> {
  render = () => {
    return (
      <ApplicationListConsumer>
        {({ applications, loading }): ReactNode => {
          if (loading) {
            return (
              <EmptyState
                variant={EmptyStateVariant.full}
                style={{
                  marginTop: '64px',
                  marginLeft: '24px',
                  marginRight: '24px',
                }}
              >
                <Spinner />
              </EmptyState>
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
