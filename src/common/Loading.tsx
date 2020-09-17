import React, { Component } from 'react';
import { EmptyState, Spinner, EmptyStateVariant } from '@patternfly/react-core';

export class Loading extends Component<{}> {
  render() {
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
}
