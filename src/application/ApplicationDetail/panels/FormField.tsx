import React, { Component } from 'react';
import { FormGroup, TextArea, TextInput } from '@patternfly/react-core';

interface Props {
  fieldId: string;
  label?: string;
  helperText?: string;
  helperTextInvalid?: string;
  validated?: 'success' | 'error' | 'default';
  onChange?: (value: string) => void;
  defaultValue?: string;
  component?: 'textarea' | 'textinput';
}

export class FormField extends Component<Props> {
  readonly render = () => {
    const component = () => {
      if (this.props.component === 'textarea') {
        return (
          <TextArea
            type="text"
            defaultValue={this.props.defaultValue}
            onChange={this.props.onChange}
            validated={this.props.validated}
          />
        );
      } else {
        return (
          <TextInput
            type="text"
            defaultValue={this.props.defaultValue}
            onChange={this.props.onChange}
            validated={this.props.validated}
          />
        );
      }
    };

    return (
      <FormGroup
        fieldId={this.props.fieldId}
        label={this.props.label}
        helperText={this.props.helperText}
        helperTextInvalid={this.props.helperTextInvalid}
        validated={this.props.validated}
      >
        {component()}
      </FormGroup>
    );
  };
}
