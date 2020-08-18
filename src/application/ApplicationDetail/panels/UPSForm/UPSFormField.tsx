import React, { Component } from 'react';
import { FormGroup, TextArea, TextInput } from '@patternfly/react-core';
import { Validator } from 'json-data-validator';
import { MultiEvaluationResult } from 'json-data-validator/build/src/Rule';
import { validatorToPF4Status } from '../../../../utils/ValidatorUtils';

interface Props {
  fieldId: string;
  label?: string;
  helperText?: string;
  helperTextInvalid?: string;
  validated?: 'success' | 'error' | 'default';
  onChange?: (value: string) => void;
  defaultValue?: string;
  component?: 'textarea' | 'textinput';
  validator?: Validator;
}

interface State {
  formValidation?: MultiEvaluationResult | null;
}

export class UPSFormField extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  readonly render = () => {
    const onChange = (newVal: string) => {
      if (this.props.validator) {
        const validation = this.props.validator.validate(
          { [this.props.fieldId]: newVal },
          true
        ) as MultiEvaluationResult;
        this.setState({ formValidation: validation });
        if (this.props.onChange) {
          this.props.onChange(newVal);
        }
      }
    };

    const component = () => {
      if (this.props.component === 'textarea') {
        return (
          <TextArea
            type="text"
            id={`ta-${this.props.fieldId}`}
            defaultValue={this.props.defaultValue}
            onChange={onChange}
            validated={validatorToPF4Status(
              this.state.formValidation,
              this.props.fieldId
            )}
          />
        );
      } else {
        return (
          <TextInput
            type="text"
            id={`ti-${this.props.fieldId}`}
            defaultValue={this.props.defaultValue}
            onChange={onChange}
            validated={validatorToPF4Status(
              this.state.formValidation,
              this.props.fieldId
            )}
          />
        );
      }
    };

    return (
      <FormGroup
        fieldId={this.props.fieldId}
        label={this.props.label}
        helperText={this.props.helperText}
        helperTextInvalid={
          this.state.formValidation?.getEvaluationResult(this.props.fieldId)
            ?.message
        }
        validated={validatorToPF4Status(
          this.state.formValidation,
          this.props.fieldId
        )}
      >
        {component()}
      </FormGroup>
    );
  };
}
