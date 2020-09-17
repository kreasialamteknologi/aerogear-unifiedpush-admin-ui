import React from 'react';
import { Component } from 'react';

import { Card, CardTitle, CardHeader, CardBody } from '@patternfly/react-core';

interface Props {
  icon?: string;
  title: string;
  description: string;
  index: number;
  first?: boolean;
}

export class ActionBox extends Component<Props> {
  render = (): React.ReactElement => {
    return (
      <Card className={this.props.first ? 'ActionBox' : 'ActionBox RightArrow'}>
        <div className="ups-number">
          <span>{this.props.index}</span>
        </div>
        <CardTitle className={'CardHead'}>
          <div className={'ActionBox-content'}>
            {this.props.icon ? (
              <i className={`fas ${this.props.icon} fa-3x muted`} />
            ) : null}
          </div>
        </CardTitle>
        <CardHeader>
          <div className={'ActionBox-content'}>{this.props.title}</div>
        </CardHeader>

        <CardBody className="small">
          <div className={'ActionBox-content'}>{this.props.description}</div>
        </CardBody>
      </Card>
    );
  };
}
