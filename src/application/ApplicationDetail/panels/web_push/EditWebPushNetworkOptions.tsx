import React, { Component } from 'react';
import {
  PushApplication,
  Variant,
  WebPushVariant,
  WebPushVariantDefinition,
} from '@aerogear/unifiedpush-admin-client';
import {
  Button,
  ButtonVariant,
  Form,
  Modal,
  ModalVariant,
  ValidatedOptions,
} from '@patternfly/react-core';
import { UpsClientFactory } from '../../../../utils/UpsClientFactory';
import {
  validatorBuilder,
  RuleBuilder,
  EvaluationResult,
  Data,
  Validator,
} from 'json-data-validator';
import { FormField } from '../FormField';

interface Props {
  visible: boolean;
  app: PushApplication;
  variant: WebPushVariant;
  onCancel: () => void;
  onSaved: (variant: Variant) => void;
}

interface State {
  updating: boolean;
  privateKey?: string;
  publicKey?: string;
  alias?: string;
  formValidation?: EvaluationResult;
}

export class EditWebPushNetworkOptions extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      updating: false,
      privateKey: this.props.variant.privateKey,
      publicKey: this.props.variant.publicKey,
      alias: this.props.variant.alias,
    };
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>) {
    if (this.props.visible && prevProps.visible !== this.props.visible) {
      this.setState({
        updating: false,
        formValidation: undefined,
      });
    }
  }

  readonly render = () => {
    const update = async () => {
      await this.setState({ updating: true });

      const update: WebPushVariantDefinition = {
        privateKey: this.state.privateKey || this.props.variant.privateKey,
        publicKey: this.state.publicKey || this.props.variant.publicKey,
        alias: this.state.alias || this.props.variant.alias,
      };

      await UpsClientFactory.getUpsClient()
        .variants.web_push.update(
          this.props.app.pushApplicationID,
          this.props.variant.variantID
        )
        .withVariantDefinition(update)
        .execute();

      this.props.variant.publicKey =
        update.publicKey ?? this.props.variant.publicKey;
      this.props.variant.privateKey =
        update.privateKey ?? this.props.variant.privateKey;
      this.props.variant.alias = update.alias ?? this.props.variant.alias;

      await this.setState({ updating: false });
      this.props.onSaved(this.props.variant);
    };

    const validator: Validator = validatorBuilder()
      .newRule()
      .withField('publicKey')
      .validate(RuleBuilder.required())
      .withField('privateKey')
      .validate(RuleBuilder.required())
      .withField('alias')
      .validate(RuleBuilder.required())
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
      <Modal
        variant={ModalVariant.small}
        title="Edit Variant"
        isOpen={this.props.visible}
        onClose={this.props.onCancel}
        actions={[
          <Button
            key="confirm"
            variant={ButtonVariant.primary}
            onClick={() => update()}
            isDisabled={!this.state.formValidation?.valid}
          >
            Save
          </Button>,
          <Button key="cancel" variant="link" onClick={this.props.onCancel}>
            Cancel
          </Button>,
        ]}
      >
        <Form isHorizontal>
          <FormField
            fieldId={'vapid-public-key'}
            label={'Push Network'}
            helperText={'Vapid Public Key'}
            helperTextInvalid={
              validationState('publicKey').validationResult?.message
            }
            validated={validationState('publicKey').status}
            defaultValue={this.props.variant.publicKey}
            onChange={(value: string) => updateField('publicKey', value)}
          />

          <FormField
            fieldId={'vapid-private-key'}
            helperText={'Vapid Private Key'}
            helperTextInvalid={
              validationState('privateKey').validationResult?.message
            }
            validated={validationState('privateKey').status}
            defaultValue={this.props.variant.privateKey}
            onChange={(value: string) => updateField('privateKey', value)}
          />
          <FormField
            fieldId={'alias'}
            helperText={'Alias'}
            helperTextInvalid={
              validationState('alias').validationResult?.message
            }
            defaultValue={this.props.variant.alias}
            onChange={(value: string) => updateField('alias', value)}
            validated={validationState('alias').status}
          />
        </Form>
      </Modal>
    );
  };
}
