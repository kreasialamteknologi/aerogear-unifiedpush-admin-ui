import React, { Component } from 'react';
import { TextProps, Text } from '@patternfly/react-core';

interface EllipsisTextProps extends TextProps {
  maxLength: number;
  message: string;
}

export class EllipsisText extends Component<EllipsisTextProps> {
  render = () => {
    return (
      <Text {...this.props}>
        {this.props.message.length <= this.props.maxLength
          ? this.props.message
          : this.props.message.substr(0, this.props.maxLength) + '...'}
      </Text>
    );
  };
}
