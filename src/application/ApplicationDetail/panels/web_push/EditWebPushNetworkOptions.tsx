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
  Modal,
  ModalVariant,
} from '@patternfly/react-core';
import { UpsClientFactory } from '../../../../utils/UpsClientFactory';
import {
  validatorBuilder,
  RuleBuilder,
  EvaluationResult,
  Data,
  Validator,
} from 'json-data-validator';
import { UPSForm, UPSFormField } from '../UPSForm';

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
      .validate(RuleBuilder.required().build())
      .withField('privateKey')
      .validate(RuleBuilder.required().build())
      .withField('alias')
      .validate(RuleBuilder.required().build())
      .build();

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
            isDisabled={
              !validator.validate((this.state as unknown) as Data).valid
            }
          >
            Save
          </Button>,
          <Button key="cancel" variant="link" onClick={this.props.onCancel}>
            Cancel
          </Button>,
        ]}
      >
        <UPSForm validator={validator}>
          <UPSFormField
            fieldId="publicKey"
            label={'Push Network'}
            helperText={'Vapid Public Key'}
            defaultValue={this.props.variant.publicKey}
            onChange={(value: string) => this.setState({ publicKey: value })}
          />

          <UPSFormField
            fieldId="privateKey"
            helperText={'Vapid Private Key'}
            defaultValue={this.props.variant.privateKey}
            onChange={(value: string) => this.setState({ privateKey: value })}
          />

          <UPSFormField
            fieldId="alias"
            helperText={'Alias'}
            defaultValue={this.props.variant.alias}
            onChange={(value: string) => this.setState({ alias: value })}
          />
        </UPSForm>
      </Modal>
    );
  };
}
