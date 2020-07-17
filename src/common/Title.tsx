import React, { Component } from 'react';
import { Title as PFTitle } from '@patternfly/react-core';

interface Props {
  headingLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export class Title extends Component<Props> {
  readonly render = () => {
    return (
      <PFTitle
        className={'ups-title-h3'}
        headingLevel={this.props.headingLevel ?? 'h3'}
        size={'md'}
      >
        {this.props.children}
      </PFTitle>
    );
  };
}
