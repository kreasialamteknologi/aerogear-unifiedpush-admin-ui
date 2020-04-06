import React from 'react';
import { Component } from 'react';

import {
  Title,
  PageSection,
  Button,
  Divider,
  GridItem,
  Grid,
  Text,
} from '@patternfly/react-core';

import { ActionBox } from './ActionBox';

export class WizardStep1 extends Component<{}> {
  render = (): React.ReactElement => {
    return (
      <>
        <PageSection variant={'light'}>
          <div style={{ textAlign: 'center' }}>
            <Title headingLevel="h1" size="3xl">
              Welcome to Unified Push Server
            </Title>
            <Text component={'small'}>
              This console will help you registering apps and variants to manage
              push notifications. Follow these steps to set up your application.
            </Text>
          </div>
        </PageSection>
        <Divider />
        <PageSection variant={'light'}>
          <Grid sm={3} gutter={'sm'}>
            <ActionBox
              first
              index={1}
              icon="fa-rocket"
              title={'Create your application'}
              description={
                'Give a name to your application. Set up just one application for all your platforms and devices.'
              }
            />
            <ActionBox
              index={2}
              icon="fa-code-branch"
              title={'Add a variant'}
              description={
                'A variant is a group of devices under a platform. Add your first variant for this application and set it up on your device code. Later on you will be able to add one variant for each platform.'
              }
            />
            <ActionBox
              index={3}
              icon="fa-paper-plane"
              title={'Send a notification'}
              description={
                'Test your setup. Send your first push notification!'
              }
            />
            <ActionBox
              index={4}
              icon="fa-desktop"
              title={'Set up sender API'}
              description={
                'This is the backend code. We have sender API configuration for Java, Node.js or Curl that will help get everything up and running fast. You can do your own sender if you want.'
              }
            />
            <GridItem sm={12} min={1000}>
              <div style={{ textAlign: 'center' }}>
                <Button variant={'primary'}>START HERE</Button>
              </div>
            </GridItem>
          </Grid>
        </PageSection>
      </>
    );
  };
}
