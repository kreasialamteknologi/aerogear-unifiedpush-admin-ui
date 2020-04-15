import {PushApplication} from '@aerogear/unifiedpush-admin-client';
import React, {Component} from 'react';
import {Divider, Grid, GridItem, List, ListItem, ListVariant, Text, TextVariants, Title,} from '@patternfly/react-core';

interface Props {
  apps: PushApplication[];
}

export class GeneralStats extends Component<Props> {
  render() {
    return (
      <div className={'apps-dashboard'}>
        <Title
          headingLevel="h1"
          size="xs"
          style={{ paddingTop: 51, paddingLeft: 20, paddingBottom: 21 }}
        >
          General Statistics
        </Title>
        <Divider />
        <Grid style={{paddingLeft: 20, paddingTop: 20}}>
        <GridItem sm={4}>
          <div><Text className={'ups-count'}>{this.props.apps.length}</Text><Text className={'ups-count-label'}>Apps</Text></div>
        </GridItem>
        <GridItem sm={4}>
        <div><Text className={'ups-count'}>0</Text><Text className={'ups-count-label'}>Messages</Text></div>
        </GridItem>
        <GridItem sm={4}>
        <div><Text className={'ups-count'}>0</Text><Text className={'ups-count-label'}>Devices</Text></div>
        </GridItem>
        </Grid>
      </div>
    );
  }
}
