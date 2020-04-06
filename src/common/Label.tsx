import React, { ReactElement } from 'react';
import { Component } from 'react';

interface Props {
  icon?: string | ReactElement;
  text: string;
}

export class Label extends Component<Props> {
  render() {
    const renderIcon = () => {
      if (this.props.icon) {
        if (typeof this.props.icon === 'string') {
          return (
            <i className={'fa fa-code-branch'} style={{ paddingRight: 3 }} />
          );
        }
        return React.cloneElement(this.props.icon, {
          style: { paddingRight: 3, verticalAlign: 'middle' },
        });
      } else {
        return undefined;
      }
    };

    return (
      <>
        {renderIcon()}
        {this.props.text}
      </>
    );
  }
}
