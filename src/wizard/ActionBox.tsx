import React from 'react';
import { Component } from 'react';

import { Page, PageSection, Title, Text } from '@patternfly/react-core';

interface Props {
  icon?: string;
  title: string;
  description: string;
  index: number;
  first?: boolean;
}

// color: #999;
// content: "\f105";
// font-size: 24px;
// left: -25px;
// position: absolute;

export class ActionBox extends Component<Props> {
  render = (): React.ReactElement => {
    return (
      <Page className={this.props.first ? 'ActionBox' : 'ActionBox RightArrow'}>
        <div className="ups-number">
          <span>{this.props.index}</span>
        </div>
        <PageSection variant={'default'}>
          <div className={'ActionBox-content'}>
            {this.props.icon ? (
              <i className={`fas ${this.props.icon} fa-3x muted`} />
            ) : null}
            <Title size={'md'}>{this.props.title}</Title>
            <Text component={'small'}>{this.props.description}</Text>
          </div>
        </PageSection>
      </Page>
    );
  };
}
