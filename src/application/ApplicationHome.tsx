import React, { Component } from 'react';
import { PushApplication } from '@aerogear/unifiedpush-admin-client';
import { PageSection, Title, Text } from '@patternfly/react-core';

interface Props {
  applications?: PushApplication[];
}

export class ApplicationHome extends Component<Props> {
  render() {
    return (
      <PageSection variant={'light'}>
        <PageSection variant={'light'}>
          <div style={{ textAlign: 'center' }}>
            <Title headingLevel="h1" size="3xl">
              Applications Add breadcrumbs
            </Title>
            <Text component={'small'}>Your applications go here.</Text>
          </div>
        </PageSection>
      </PageSection>
    );
  }
}
