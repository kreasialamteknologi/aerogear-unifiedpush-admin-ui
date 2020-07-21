import React, { Component } from 'react';
import {
  IOSTokenVariant,
  IOSTokenVariantDefinition,
  PushApplication,
  Variant,
} from '@aerogear/unifiedpush-admin-client';
import {
  Button,
  ButtonVariant,
  Form,
  FormGroup,
  Modal,
  ModalVariant,
  Switch,
} from '@patternfly/react-core';
import { UpsClientFactory } from '../../../../utils/UpsClientFactory';
import {
  validatorBuilder,
  RuleBuilder,
  Data,
  Validator,
} from 'json-data-validator';
import { FormField } from '../FormField';
import { MultiEvaluationResult } from 'json-data-validator/build/src/Rule';

interface Props {
  visible: boolean;
  app: PushApplication;
  variant: IOSTokenVariant;
  onCancel: () => void;
  onSaved: (variant: Variant) => void;
}

interface State {
  updating: boolean;
  privateKey?: string;
  keyId?: string;
  teamId?: string;
  bundleId?: string;
  production?: boolean;
  formValidation?: MultiEvaluationResult;
}

export class EditIOSTokenNetworkOptions extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      updating: false,
      production: this.props.variant.production,
      keyId: this.props.variant.keyId,
      teamId: this.props.variant.teamId,
      bundleId: this.props.variant.bundleId,
    };
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>) {
    if (this.props.visible && prevProps.visible !== this.props.visible) {
      this.setState({
        updating: false,
      });
    }
  }

  readonly render = () => {
    const update = async () => {
      await this.setState({ updating: true });

      const update: IOSTokenVariantDefinition = {
        keyId: this.state.keyId || this.props.variant.keyId,
        teamId: this.state.teamId || this.props.variant.teamId,
        bundleId: this.state.bundleId || this.props.variant.bundleId,
        production: !!this.state.production,
      };

      if (this.state.privateKey && this.state.privateKey.length > 0) {
        update.privateKey = this.state.privateKey;
      }

      // make the call
      await UpsClientFactory.getUpsClient()
        .variants.ios_token.update(
          this.props.app.pushApplicationID,
          this.props.variant.variantID
        )
        .withVariantDefinition(update)
        .execute();

      this.props.variant.keyId = this.state.keyId || this.props.variant.keyId;
      this.props.variant.teamId =
        this.state.teamId || this.props.variant.teamId;
      this.props.variant.bundleId =
        this.state.bundleId || this.props.variant.bundleId;
      this.props.variant.production = !!this.state.production;

      await this.setState({ updating: false });
      this.props.onSaved(this.props.variant);
    };

    const validator: Validator = validatorBuilder()
      .newRule()
      .withField('keyId')
      .validate(RuleBuilder.required().build())
      .validate(
        RuleBuilder.length.withLength(
          10,
          "Field 'Key ID' must be exactly 10 characters long"
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
      <Modal
        variant={ModalVariant.small}
        title="Edit Variant"
        isOpen={this.props.visible}
        onClose={this.props.onCancel}
        actions={[
          <Button
            key="confirm"
            variant={ButtonVariant.primary}
            onClick={update}
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
            defaultValue={this.props.variant.privateKey}
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
            defaultValue={this.props.variant.keyId}
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
            defaultValue={this.props.variant.teamId}
            onChange={(value: string) => updateField('teamId', value)}
          />
          <FormField
            fieldId={'variant-bundle-id'}
            helperText={'Bundle Id'}
            helperTextInvalid={
              this.state.formValidation?.getEvaluationResult('bundleId')
                ?.message
            }
            validated={
              !this.state.formValidation ||
              this.state.formValidation.isValid('bundleId')
                ? 'success'
                : 'error'
            }
            defaultValue={this.props.variant.bundleId}
            onChange={(value: string) => updateField('bundleId', value)}
          />
          <FormGroup fieldId={'Push Network'}>
            <Switch
              id="simple-switch"
              label="Production"
              labelOff="Development"
              isChecked={!!this.state.production}
              onChange={() =>
                this.setState({ production: !this.state.production })
              }
            />
          </FormGroup>
        </Form>
      </Modal>
    );
  };
}
