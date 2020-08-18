import React, { Component } from 'react';

import { Button, Form } from '@patternfly/react-core';
import { AndroidVariant, Variant } from '@aerogear/unifiedpush-admin-client';
import { FormField } from '../ApplicationDetail/panels/FormField';
import {
  Data,
  RuleBuilder,
  Validator,
  validatorBuilder,
} from 'json-data-validator';
import { MultiEvaluationResult } from 'json-data-validator/build/src/Rule';
import { formIsValid, validatorToPF4Status } from '../../utils/ValidatorUtils';

interface State {
  serverKey: string;
  senderID: string;
  formValidation?: MultiEvaluationResult;
}

interface Props {
  open: boolean;
  variantName: string;
  onSave: (variant: Variant) => void;
  close: () => void;
}

export class AndroidVariantForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      serverKey: '',
      senderID: '',
    };
  }

  render(): React.ReactNode {
    if (!this.props.open) {
      return null;
    }

    const validator: Validator = validatorBuilder()
      .newRule()
      .withField('serverKey')
      .validate(
        RuleBuilder.matches(
          '^.{1,255}$',
          "Field 'Server Key' must be between 1 and 255 characters"
        )
      )
      .validate(
        RuleBuilder.required()
          .withErrorMessage("Field 'Server Key' is mandatory")
          .build()
      )
      .withField('senderID')
      .validate(
        RuleBuilder.matches(
          '^.{1,255}$',
          "Field 'Sender ID' must be between 1 and 255 characters"
        )
      )
      .validate(
        RuleBuilder.required()
          .withErrorMessage("Field 'Sender ID' is mandatory")
          .build()
      )
      .build();

    const updateField = (name: string, value: string) => {
      this.setState(({
        [name]: value,
        formValidation: validator.validate(
          ({ ...this.state, [name]: value } as unknown) as Data,
          true
        ),
      } as unknown) as State);
    };

    const save = () => {
      const variant = {
        name: this.props.variantName,
        type: 'android',
        googleKey: this.state.serverKey,
        projectNumber: this.state.senderID,
      } as AndroidVariant;
      this.props.onSave(variant);
    };

    return (
      <Form className="AndroidVariantForm" isHorizontal>
        <FormField
          fieldId={'server-key'}
          label={'Push Network'}
          helperText={'Server Key'}
          onChange={value => updateField('serverKey', value)}
          helperTextInvalid={
            this.state.formValidation?.getEvaluationResult('serverKey')?.message
          }
          validated={validatorToPF4Status(
            this.state.formValidation,
            'serverKey'
          )}
        />

        <FormField
          fieldId={'server-key'}
          helperText={'Sender ID'}
          onChange={value => updateField('senderID', value)}
          helperTextInvalid={
            this.state.formValidation?.getEvaluationResult('senderID')?.message
          }
          validated={validatorToPF4Status(
            this.state.formValidation,
            'senderID'
          )}
        />
        <div className="variantFormButtons">
          <Button
            className="dialogBtn"
            onClick={save}
            isDisabled={
              !this.props.variantName ||
              this.props.variantName.length === 0 ||
              !formIsValid(this.state.formValidation)
            }
          >
            Create
          </Button>
          <Button variant="secondary" onClick={() => this.props.close()}>
            Cancel
          </Button>
        </div>
      </Form>
    );
  }
}
