import React, { Component } from 'react';

import {
  TextInput,
  Button,
  Form,
  FormGroup,
  ValidatedOptions,
} from '@patternfly/react-core';
import { Variant, WebPushVariant } from '@aerogear/unifiedpush-admin-client';
import { MultiEvaluationResult } from 'json-data-validator/build/src/Rule';
import {
  validatorBuilder,
  RuleBuilder,
  Data,
  Validator,
} from 'json-data-validator';
import { FormField } from '../ApplicationDetail/panels/FormField';

interface State {
  webpushVapidPublicKey: string;
  webpushVapidPrivateKey: string;
  webpushAlias: string;
  formValidation?: MultiEvaluationResult;
}

interface Props {
  open: boolean;
  variantName: string;
  onSave: (variant: Variant) => void;
  close: () => void;
}

export class WebpushVariantForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      webpushVapidPublicKey: '',
      webpushVapidPrivateKey: '',
      webpushAlias: '',
    };
  }
  render(): React.ReactNode {
    const save = () => {
      console.log('saving');
      const variant = {
        name: this.props.variantName,
        type: 'web_push',
        publicKey: this.state.webpushVapidPublicKey,
        privateKey: this.state.webpushVapidPrivateKey,
        alias: this.state.webpushAlias,
      } as WebPushVariant;
      this.props.onSave(variant);
    };

    if (!this.props.open) {
      return null;
    }

    const validator: Validator = validatorBuilder()
      .newRule()
      .withField('webpushVapidPublicKey')
      .validate(RuleBuilder.matches('^[A-Za-z0-9_-]*$'))
      .validate(
        RuleBuilder.required()
          .withErrorMessage('A Valid Public key is required')
          .build()
      )
      .withField('webpushVapidPrivateKey')
      .validate(RuleBuilder.matches('^[A-Za-z0-9_-]*$'))
      .validate(
        RuleBuilder.required()
          .withErrorMessage(
            'Private Key is invalid or does not match Public key'
          )
          .build()
      )
      .withField('webpushAlias')
      .validate(RuleBuilder.matches(''))
      .validate(
        RuleBuilder.required()
          .withErrorMessage('Please enter an appropriate mailto')
          .build()
      )
      .build();

    const validationState = (field: string) => {
      const evaluationResult = this.state.formValidation?.details?.find(
        value => value.field === field
      );
      if (evaluationResult?.valid) {
        return {
          valid: true,
          status: ValidatedOptions.success,
        };
      }
      if (evaluationResult?.valid === false) {
        return {
          valid: true,
          validationResult: evaluationResult,
          status: ValidatedOptions.error,
        };
      }
      return {
        valid: true,
        status: ValidatedOptions.default,
      };
    };

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
      <Form className="WebPushVariantForm">
        <FormField
          fieldId={'vapid-public-key'}
          label={'Push Network'}
          helperText={'Vapid Public Key'}
          helperTextInvalid={
            validationState('webpushVapidPublicKey').validationResult?.message
          }
          validated={
            !this.state.formValidation ||
            this.state.formValidation.isValid('webpushVapidPublicKey')
              ? 'success'
              : 'error'
          }
          onChange={value => {
            updateField('webpushVapidPublicKey', value as string);
          }}
        />
        <FormField
          fieldId={'vapid-private-key'}
          helperText={'Vapid Private Key'}
          helperTextInvalid={
            validationState('webpushVapidPrivateKey').validationResult?.message
          }
          onChange={value => {
            updateField('webpushVapidPrivateKey', value as string);
          }}
          validated={
            !this.state.formValidation ||
            this.state.formValidation.isValid('webpushVapidPrivateKey')
              ? 'success'
              : 'error'
          }
        />
        <FormField
          fieldId={'alias'}
          helperText={'Alias'}
          helperTextInvalid={
            validationState('webpushAlias').validationResult?.message
          }
          onChange={value => {
            updateField('webpushAlias', value as string);
          }}
          validated={
            !this.state.formValidation ||
            this.state.formValidation.isValid('webpushAlias')
              ? 'success'
              : 'error'
          }
        />

        <div className="variantFormButtons">
          <Button
            onClick={save}
            className="dialogBtn"
            isDisabled={!this.state.formValidation?.valid}
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
