import { PushApplication } from '@aerogear/unifiedpush-admin-client';
import React, { Component } from 'react';
import {
  Divider,
  Grid,
  GridItem,
  Text,
  TextVariants,
} from '@patternfly/react-core';

interface Props {
  app: PushApplication;
}

export class ApplicationStats extends Component<Props> {
  render() {
    return (
      <div className={'apps-dashboard'}>
        <Text
          component={TextVariants.h6}
          //size="md"
          style={{
            paddingTop: 51,
            paddingLeft: 20,
            paddingBottom: 21,
            fontSize: 15,
          }}
        >
          App Statistics
        </Text>
        <Divider />
        <Grid style={{ paddingLeft: 20, paddingTop: 20 }}>
          <GridItem sm={4}>
            <div>
              <Text className={'ups-count'}>
                {this.props.app.variants!.length}
              </Text>
              <Text className={'ups-count-label'}>Variant</Text>
            </div>
          </GridItem>
          <GridItem sm={4}>
            <div>
              <Text className={'ups-count'}>
                {this.props.app!.metadata?.activity || 0}
              </Text>
              <Text className={'ups-count-label'}>Messages</Text>
            </div>
          </GridItem>
          <GridItem sm={4}>
            <div>
              <Text className={'ups-count'}>
                {this.props.app!.metadata?.deviceCount || 0}
              </Text>
              <Text className={'ups-count-label'}>Devices</Text>
            </div>
          </GridItem>
        </Grid>
      </div>
    );
  }
}
