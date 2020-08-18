import React, { Component } from 'react';
import { Button, Form, FormGroup, Radio, Switch } from '@patternfly/react-core';
import { Variant, IOSTokenVariant } from '@aerogear/unifiedpush-admin-client';
import { MultiEvaluationResult } from 'json-data-validator/build/src/Rule';
import {
  validatorBuilder,
  RuleBuilder,
  Data,
  Validator,
} from 'json-data-validator';
import { FormField } from '../ApplicationDetail/panels/FormField';
import { formIsValid, validatorToPF4Status } from '../../utils/ValidatorUtils';

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

    const updateField = (name: string, value: string) => {
      this.setState(({
        [name]: value,
        formValidation: validator.validate(
          ({ ...this.state, [name]: value } as unknown) as Data,
          true
        ),
      } as unknown) as State);
    };

    return (
      <Form className="ios TokenVariantForm" isHorizontal>
        <FormField
          component={'textarea'}
          fieldId={'variant-private-key'}
          label={'Push Network'}
          helperText={'Private Key'}
          helperTextInvalid={
            this.state.formValidation?.getEvaluationResult('privateKey')
              ?.message
          }
          validated={validatorToPF4Status(
            this.state.formValidation,
            'privateKey'
          )}
          onChange={(value: string) => updateField('privateKey', value)}
        />
        <FormField
          fieldId={'variant-key-id'}
          helperText={'Key Id'}
          helperTextInvalid={
            this.state.formValidation?.getEvaluationResult('keyId')?.message
          }
          validated={validatorToPF4Status(this.state.formValidation, 'keyId')}
          onChange={(value: string) => updateField('keyId', value)}
        />
        <FormField
          fieldId={'variant-team-id'}
          helperText={'Team Id'}
          helperTextInvalid={
            this.state.formValidation?.getEvaluationResult('teamId')?.message
          }
          validated={validatorToPF4Status(this.state.formValidation, 'teamId')}
          onChange={(value: string) => updateField('teamId', value)}
        />
        <FormField
          fieldId={'variant-bundle-id'}
          helperText={'Bundle Id'}
          helperTextInvalid={
            this.state.formValidation?.getEvaluationResult('bundleId')?.message
          }
          validated={validatorToPF4Status(
            this.state.formValidation,
            'bundleId'
          )}
          onChange={(value: string) => updateField('bundleId', value)}
        />
        <FormGroup fieldId={'production'}>
          <Switch
            id="simple-switch"
            label="Production"
            labelOff="Development"
            isChecked={this.state.production}
            onChange={() => {
              this.setState({ production: !this.state.production });
              this.setState(({
                production: !this.state.production,
              } as unknown) as State);
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
