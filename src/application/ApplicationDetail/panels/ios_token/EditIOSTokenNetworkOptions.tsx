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
  TextArea,
  TextInput,
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
  formValidation?: EvaluationResult;
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

      console.log('updated');

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
      .validate(RuleBuilder.required())
      .validate(RuleBuilder.length.withLength(10))
      .withField('teamId')
      .validate(RuleBuilder.required())
      .validate(RuleBuilder.length.withLength(10))
      .withField('bundleId')
      .validate(RuleBuilder.matches('^[a-z0-9]+(\\.[a-z0-9]+)+$'))
      .build();

    const validationState = (field: string) => {
      const evaluationResult = this.state.formValidation?.details?.find(
        value => value.field === field
      );
      if (evaluationResult?.valid) {
        console.log('valid');
        return {
          valid: true,
          status: ValidatedOptions.success,
        };
      }
      if (evaluationResult?.valid === false) {
        console.log('error');
        return {
          valid: true,
          validationResult: evaluationResult,
          status: ValidatedOptions.error,
        };
      }
      console.log('default');
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
          <FormGroup
            fieldId={'Push Network'}
            label={'Push Network'}
            helperText={'Private Key'}
          >
            <TextArea
              type="text"
              defaultValue={this.props.variant.privateKey}
              onChange={value => this.setState({ privateKey: value })}
            />
          </FormGroup>
          <FormGroup
            fieldId={'Push Network'}
            helperText={'Key Id'}
            helperTextInvalid={
              validationState('keyId').validationResult?.message
            }
            validated={validationState('keyId').status}
          >
            <TextInput
              type="text"
              defaultValue={this.props.variant.keyId}
              onChange={(value: string) => updateField('keyId', value)}
              validated={validationState('keyId').status}
            />
          </FormGroup>
          <FormGroup
            fieldId={'Push Network'}
            helperText={'Team Id'}
            helperTextInvalid={
              validationState('teamId').validationResult?.message
            }
            validated={validationState('teamId').status}
          >
            <TextInput
              type="text"
              defaultValue={this.props.variant.teamId}
              onChange={(value: string) => updateField('teamId', value)}
              validated={validationState('teamId').status}
            />
          </FormGroup>
          <FormGroup
            fieldId={'Push Network'}
            helperText={'Bundle Id'}
            helperTextInvalid={
              validationState('bundleId').validationResult?.message
            }
            validated={validationState('bundleId').status}
          >
            <TextInput
              type="text"
              defaultValue={this.props.variant.bundleId}
              onChange={(value: string) => updateField('bundleId', value)}
              validated={validationState('bundleId').status}
            />
          </FormGroup>
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
