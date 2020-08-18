import React, { Component } from 'react';

import { Button, Form, ValidatedOptions } from '@patternfly/react-core';
import { Variant, WebPushVariant } from '@aerogear/unifiedpush-admin-client';
import { MultiEvaluationResult } from 'json-data-validator/build/src/Rule';
import {
  validatorBuilder,
  RuleBuilder,
  Data,
  Validator,
} from 'json-data-validator';
import { FormField } from '../ApplicationDetail/panels/FormField';
import { validatorToPF4Status } from '../../utils/ValidatorUtils';

interface State {
  webpushVapidPublicKey: string;
  webpushVapidPrivateKey: string;
  webpushAlias: string;
  formValidation?: MultiEvaluationResult | null;
}

interface Props {
  open: boolean;
  variantName: string;
  onSave: (variant: Variant) => void;
  close: () => void;
}

const initialState: State = {
  webpushVapidPublicKey: '',
  webpushVapidPrivateKey: '',
  webpushAlias: '',
  formValidation: null,
};

export class WebpushVariantForm extends Component<Props, State> {
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
          .withErrorMessage('A Valid private key is required')
          .build()
      )
      .withField('webpushAlias')
      .validate(
        RuleBuilder.required()
          .withErrorMessage('Please enter a mailto or URL address')
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
      <Form className="WebPushVariantForm" isHorizontal>
        <FormField
          fieldId={'vapid-public-key'}
          label={'Push Network'}
          helperText={'Vapid Public Key'}
          helperTextInvalid={
            validationState('webpushVapidPublicKey').validationResult?.message
          }
          validated={validatorToPF4Status(
            this.state.formValidation,
            'webpushVapidPublicKey'
          )}
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
          validated={validatorToPF4Status(
            this.state.formValidation,
            'webpushVapidPrivateKey'
          )}
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
          validated={validatorToPF4Status(
            this.state.formValidation,
            'webpushAlias'
          )}
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
