import React, { Component } from 'react';
import {
  IOSTokenVariant,
  IOSTokenVariantDefinition,
  IOSVariant,
  IOSVariantDefinition,
  PushApplication,
  Variant,
} from '@aerogear/unifiedpush-admin-client';
import {
  Button,
  ButtonVariant,
  FileUpload,
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
  variant: IOSVariant;
  onCancel: () => void;
  onSaved: (variant: Variant) => void;
}

interface State {
  updating: boolean;
  passphrase?: string;
  filename?: string;
  certificate?: string;
  production: boolean;
  formValidation?: EvaluationResult;
}

export class EditIOSCertNetworkOptions extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      updating: false,
      production: this.props.variant.production,
    };
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>) {
    if (this.props.visible && prevProps.visible !== this.props.visible) {
      this.setState({
        certificate: undefined,
        passphrase: undefined,
        updating: false,
      });
    }
  }

  readonly render = () => {
    const updateVariant = async () => {
      const update: IOSVariantDefinition = {
        passphrase: this.state.passphrase,
        production: this.state.production,
      };
      if (this.state.certificate) {
        update.certificate = this.state.certificate.substr(
          'data:application/x-pkcs12;base64,'.length
        );
      }

      await this.setState({ updating: true });

      await UpsClientFactory.getUpsClient()
        .variants.ios.update(
          this.props.app.pushApplicationID,
          this.props.variant.variantID
        )
        .withVariantDefinition(update)
        .execute();

      this.props.variant.production = this.state.production;

      await this.setState({ updating: false });

      this.props.onSaved(this.props.variant);
    };

    const validator: Validator = validatorBuilder()
      .newRule()
      .withField('certificate')
      .validate(RuleBuilder.matches('^data:application/x-pkcs12;base64,'))
      .withField('passphrase')
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
        variant={ModalVariant.large}
        title="Edit Variant"
        isOpen={this.props.visible}
        onClose={this.props.onCancel}
        actions={[
          <Button
            key="confirm"
            variant={ButtonVariant.primary}
            onClick={() => updateVariant()}
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
            helperText={'Apple Push Notification Service certificate'}
            helperTextInvalid={'Selected file must be a PKCS#12 file (.p12)'}
            validated={validationState('certificate').status}
          >
            <FileUpload
              type={'dataURL'}
              filename={this.state.filename}
              id={'certificate'}
              onChange={(value, filename) => {
                updateField('certificate', value as string);
              }}
              validated={validationState('certificate').status}
            />
          </FormGroup>
          <FormGroup
            fieldId={'Push Network'}
            helperText={'passphrase'}
            helperTextInvalid={
              validationState('passphrase').validationResult?.message
            }
            validated={validationState('passphrase').status}
          >
            <TextInput
              type="password"
              defaultValue={this.props.variant.passphrase}
              onChange={(value: string) => updateField('passphrase', value)}
              validated={validationState('passphrase').status}
            />
          </FormGroup>
          <FormGroup fieldId={'Push Network'}>
            <Switch
              id="simple-switch"
              label="Production"
              labelOff="Development"
              isChecked={this.state.production}
              onChange={() => {
                this.setState({ production: !this.state.production });
                this.setState(({
                  production: !this.state.production,
                  formValidation: validator.validate(
                    (this.state as unknown) as Data,
                    true
                  ),
                } as unknown) as State);
              }}
            />
          </FormGroup>
        </Form>
      </Modal>
    );
  };
}
