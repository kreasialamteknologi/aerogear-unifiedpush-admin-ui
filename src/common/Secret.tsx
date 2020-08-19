import React, { Component } from 'react';
import { Text, TextVariants, Tooltip } from '@patternfly/react-core';
import { EyeIcon, EyeSlashIcon } from '@patternfly/react-icons';

interface State {
  visible: boolean;
}

interface Props {
  text: string;
}

const hidden = {
  color: 'transparent',
  textShadow: '0 0 5px rgba(0,0,0,0.5)',
};

const visible = {
  color: 'black',
};

export class Secret extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  render = () => {
    const icon = () => {
      if (this.state.visible) {
        return (
          <EyeSlashIcon
            style={{
              color: 'black',
              verticalAlign: 'middle',
              paddingBottom: 3,
            }}
            onClick={() => this.setState({ visible: false })}
          />
        );
      } else {
        return (
          <EyeIcon
            style={{
              color: 'black',
              verticalAlign: 'middle',
              paddingBottom: 3,
            }}
            onClick={() => this.setState({ visible: true })}
          />
        );
      }
    };

    return (
      <Text
        style={this.state.visible ? visible : hidden}
        component={TextVariants.small}
      >
        {this.props.text}&nbsp;{icon()}
      </Text>
    );
  };
}
