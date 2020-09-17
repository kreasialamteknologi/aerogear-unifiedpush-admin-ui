import React, { Component } from 'react';
import {
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
  TextInput,
} from '@patternfly/react-core';
import { UpsClientFactory } from '../../../../utils/UpsClientFactory';
import {
  validatorBuilder,
  RuleBuilder,
  Data,
  Validator,
} from 'json-data-validator';
import { MultiEvaluationResult } from 'json-data-validator/build/src/Rule';

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
  formValidation?: MultiEvaluationResult;
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
      .validate(
        RuleBuilder.matches(
          '^data:application/x-pkcs12;base64,',
          'Uploaded file must be a Base64 encoded PKCS#12 file'
        )
      )
      .validate(
        RuleBuilder.required()
          .withErrorMessage('Certificate file is mandatory')
          .build()
      )
      .withField('passphrase')
      .validate(
        RuleBuilder.required()
          .withErrorMessage("Field 'passphrase' is mandatory")
          .build()
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
            validated={
              !this.state.formValidation ||
              this.state.formValidation.isValid('certificate')
                ? 'success'
                : 'error'
            }
          >
            <FileUpload
              type={'dataURL'}
              filename={this.state.filename}
              id={'certificate'}
              onChange={(value, filename) => {
                updateField('certificate', value as string);
              }}
              validated={
                !this.state.formValidation ||
                this.state.formValidation.isValid('certificate')
                  ? 'success'
                  : 'error'
              }
            />
          </FormGroup>
          <FormGroup
            fieldId={'Push Network'}
            helperText={'passphrase'}
            helperTextInvalid={
              this.state.formValidation?.getEvaluationResult('passphrase')
                ?.message
            }
            validated={
              !this.state.formValidation ||
              this.state.formValidation.isValid('passphrase')
                ? 'success'
                : 'error'
            }
          >
            <TextInput
              type="password"
              defaultValue={this.props.variant.passphrase}
              onChange={(value: string) => updateField('passphrase', value)}
              validated={
                !this.state.formValidation ||
                this.state.formValidation.isValid('passphrase')
                  ? 'success'
                  : 'error'
              }
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
