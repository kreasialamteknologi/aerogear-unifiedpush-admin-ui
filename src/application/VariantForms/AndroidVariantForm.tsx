import React, { Component } from 'react';

import { Button } from '@patternfly/react-core';
import { AndroidVariant, Variant } from '@aerogear/unifiedpush-admin-client';
import { UPSForm, UPSFormField } from '../ApplicationDetail/panels/UPSForm';
import {
  Data,
  RuleBuilder,
  Validator,
  validatorBuilder,
} from 'json-data-validator';
import { MultiEvaluationResult } from 'json-data-validator/build/src/Rule';

interface State {
  serverKey: string;
  senderID: string;
  formValidation?: MultiEvaluationResult | null;
}

interface Props {
  open: boolean;
  variantName: string;
  onSave: (variant: Variant) => void;
  close: () => void;
}

const initialState: State = {
  serverKey: '',
  senderID: '',
  formValidation: null,
};

export class AndroidVariantForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { ...initialState };
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>) {
    if (prevProps.open && !this.props.open) {
      this.setState(initialState);
    }
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
      <UPSForm validator={validator}>
        <UPSFormField
          fieldId="serverKey"
          label={'Push Network'}
          helperText={'Server Key'}
          onChange={value => this.setState({ serverKey: value })}
        />

        <UPSFormField
          fieldId="senderID"
          helperText={'Sender ID'}
          onChange={value => this.setState({ senderID: value })}
        />

        <div className="variantFormButtons">
          <Button
            className="dialogBtn"
            onClick={save}
            isDisabled={
              !this.props.variantName ||
              this.props.variantName.trim().length === 0 ||
              !validator.validate((this.state as unknown) as Data).valid
            }
          >
            Create
          </Button>
          <Button variant="secondary" onClick={() => this.props.close()}>
            Cancel
          </Button>
        </div>
      </UPSForm>
    );
  }
}
