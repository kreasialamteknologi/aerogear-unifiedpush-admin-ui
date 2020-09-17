import React, { Component } from 'react';
import { Button, FormGroup, Switch } from '@patternfly/react-core';
import { Variant, IOSTokenVariant } from '@aerogear/unifiedpush-admin-client';
import { MultiEvaluationResult } from 'json-data-validator/build/src/Rule';
import {
  validatorBuilder,
  RuleBuilder,
  Data,
  Validator,
} from 'json-data-validator';
import { UPSForm, UPSFormField } from '../ApplicationDetail/panels/UPSForm';

interface State {
  privateKey: string;
  keyId: string;
  teamId: string;
  bundleId: string;
  production: boolean;
  formValidation?: MultiEvaluationResult | null;
}

interface Props {
  open: boolean;
  variantName: string;
  onSave: (variant: Variant) => void;
  close: () => void;
}

const initialState: State = {
  privateKey: '',
  keyId: '',
  teamId: '',
  bundleId: '',
  production: false,
  formValidation: null,
};

export class IOSTokenVariantForm extends Component<Props, State> {
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
    const save = () => {
      const variant = {
        name: this.props.variantName,
        type: 'ios_token',
        privateKey: this.state.privateKey,
        keyId: this.state.keyId,
        teamId: this.state.teamId,
        bundleId: this.state.bundleId,
        production: this.state.production,
      } as IOSTokenVariant;
      this.props.onSave(variant);
    };

    if (!this.props.open) {
      return null;
    }

    const validator: Validator = validatorBuilder()
      .newRule()
      .withField('privateKey')
      .validate(
        RuleBuilder.required()
          .withErrorMessage("Field 'Private Key' is required")
          .build()
      )
      .withField('keyId')
      .validate(RuleBuilder.required().build())
      .validate(
        RuleBuilder.length.withLength(
          10,
          "Field 'Key ID' must be excactly 10 characters long"
        )
      )
      .withField('teamId')
      .validate(RuleBuilder.required().build())
      .validate(
        RuleBuilder.length.withLength(
          10,
          "Field 'Team ID' must be exactly 10 characters long"
        )
      )
      .withField('bundleId')
      .validate(RuleBuilder.required().build())
      .validate(
        RuleBuilder.matches(
          '^[a-z0-9]+(\\.[a-z0-9]+)+$',
          'The Bundle ID must be a valid URL'
        )
      )
      .build();

    return (
      <UPSForm validator={validator}>
        <UPSFormField
          fieldId="privateKey"
          label={'Push Network'}
          component={'textarea'}
          helperText={'Private Key'}
          onChange={value => this.setState({ privateKey: value })}
        />

        <UPSFormField
          fieldId="keyId"
          helperText={'Key Id'}
          onChange={value => this.setState({ keyId: value })}
        />

        <UPSFormField
          fieldId="teamId"
          helperText={'Team Id'}
          onChange={value => this.setState({ teamId: value })}
        />

        <UPSFormField
          fieldId="bundleId"
          helperText={'Bundle Id'}
          onChange={value => this.setState({ bundleId: value })}
        />

        <FormGroup fieldId={'production'}>
          <Switch
            id="simple-switch"
            label="Production"
            labelOff="Development"
            isChecked={this.state.production}
            onChange={(checked: boolean) => {
              this.setState({ production: checked });
            }}
          />
        </FormGroup>
        <div className="variantFormButtons">
          <Button
            onClick={save}
            className="dialogBtn"
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
