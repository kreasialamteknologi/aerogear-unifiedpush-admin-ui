import React, { Component, ReactElement } from 'react';
import { Form } from '@patternfly/react-core';
import { Validator } from 'json-data-validator';

interface Props {
  validator: Validator;
}

export class UPSForm extends Component<Props> {
  render(): React.ReactNode {
    const elements = React.Children.toArray(this.props.children).map(
      (child: React.ReactNode) =>
        React.cloneElement(child as ReactElement, {
          validator: this.props.validator,
        })
    );
    return <Form isHorizontal>{elements}</Form>;
  }
}
