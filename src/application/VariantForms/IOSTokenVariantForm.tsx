import React, { Component } from 'react';
import {
  TextInput,
  Button,
  Form,
  FormGroup,
  Radio,
  TextArea,
} from '@patternfly/react-core';
import { Variant, IOSTokenVariant } from '@aerogear/unifiedpush-admin-client';
import { MultiEvaluationResult } from 'json-data-validator/build/src/Rule';
import {
  validatorBuilder,
  RuleBuilder,
  Data,
  Validator,
} from 'json-data-validator';
import { FormField } from '../ApplicationDetail/panels/FormField';

interface State {
  privateKey: string;
  keyId: string;
  teamId: string;
  bundleId: string;
  production: boolean;
  formValidation?: MultiEvaluationResult;
}

interface Props {
  open: boolean;
  variantName: string;
  onSave: (variant: Variant) => void;
  close: () => void;
}

export class IOSTokenVariantForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      privateKey: '',
      keyId: '',
      teamId: '',
      bundleId: '',
      production: false,
    };
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
      .withField('iosTokenPrivateKey')
      .validate(RuleBuilder.matches(''))
      .withField('iosTokenKeyId')
      .validate(RuleBuilder.required().build())
      .validate(
        RuleBuilder.length.withLength(
          10,
          "Field 'Key ID' must be excactly 10 characters long"
        )
      )
      .withField('iosTokenKeyId')
      .validate(RuleBuilder.required().build())
      .validate(
        RuleBuilder.length.withLength(
          10,
          "Field 'Team ID' must be exactly 10 characters long"
        )
      )
      .withField('iosBundleId')
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
      <Form className="ios TokenVariantForm">
        <FormField
          component={'textarea'}
          fieldId={'variant-private-key'}
          label={'Push Network'}
          helperText={'Private Key'}
          helperTextInvalid={
            this.state.formValidation?.getEvaluationResult('privateKey')
              ?.message
          }
          validated={
            !this.state.formValidation ||
            this.state.formValidation.isValid('privateKey')
              ? 'success'
              : 'error'
          }
          onChange={(value: string) => updateField('privateKey', value)}
        />
        <FormField
          component={'textarea'}
          fieldId={'variant-key-id'}
          helperText={'Key Id'}
          helperTextInvalid={
            this.state.formValidation?.getEvaluationResult('keyId')?.message
          }
          validated={
            !this.state.formValidation ||
            this.state.formValidation.isValid('keyId')
              ? 'success'
              : 'error'
          }
          onChange={(value: string) => updateField('keyId', value)}
        />
        <FormField
          fieldId={'variant-team-id'}
          helperText={'Team Id'}
          helperTextInvalid={
            this.state.formValidation?.getEvaluationResult('teamId')?.message
          }
          validated={
            !this.state.formValidation ||
            this.state.formValidation.isValid('teamId')
              ? 'success'
              : 'error'
          }
          onChange={(value: string) => updateField('teamId', value)}
        />
        <FormField
          fieldId={'variant-bundle-id'}
          helperText={'Bundle Id'}
          helperTextInvalid={
            this.state.formValidation?.getEvaluationResult('bundleId')?.message
          }
          validated={
            !this.state.formValidation ||
            this.state.formValidation.isValid('bundleId')
              ? 'success'
              : 'error'
          }
          onChange={(value: string) => updateField('bundleId', value)}
        />
        <Radio
          className="radioBtn"
          id={'iOSTokenProduction'}
          name="Production"
          label="Production"
          isChecked={this.state.production}
          onChange={checked => {
            this.setState({ production: checked });
          }}
        />
        <Radio
          className="radioBtn"
          id={'iOSTokenDevelopment'}
          name="Development"
          label="Development"
          isChecked={!this.state.production}
          onChange={checked => {
            this.setState({ production: !checked });
          }}
        />
        <div className="variantFormButtons">
          <Button
            onClick={save}
            className="dialogBtn"
            isDisabled={
              !this.props.variantName ||
              this.props.variantName.trim().length === 0 ||
              !this.state.bundleId ||
              this.state.bundleId.trim().length === 0 ||
              !this.state.keyId ||
              this.state.keyId.trim().length === 0 ||
              !this.state.privateKey ||
              this.state.privateKey.trim().length === 0 ||
              !this.state.teamId ||
              this.state.teamId.trim().length === 0
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
