import React, { Component } from 'react';
import { EmptyState, Spinner, EmptyStateVariant } from '@patternfly/react-core';

interface Props {
  visible: boolean;
}

export class Loading extends Component<Props> {
  render() {
    if (this.props.visible) {
      return (
        <EmptyState className={'emptyState'} variant={EmptyStateVariant.full}>
          <Spinner />
        </EmptyState>
      );
    } else {
      return null;
    }
  }
}
