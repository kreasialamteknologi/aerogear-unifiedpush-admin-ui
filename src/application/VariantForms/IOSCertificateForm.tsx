import React, { Component } from 'react';
import {
  TextInput,
  Button,
  Form,
  FormGroup,
  Radio,
  FileUpload,
} from '@patternfly/react-core';
import { Variant, IOSVariant } from '@aerogear/unifiedpush-admin-client';
import {
  validatorBuilder,
  RuleBuilder,
  Data,
  Validator,
} from 'json-data-validator';
import { MultiEvaluationResult } from 'json-data-validator/build/src/Rule';

const parseDataURL = require('data-urls');

interface State {
  iosCertificate?: string;
  filename?: string;
  passphrase?: string;
  production: boolean;
  formValidation?: MultiEvaluationResult;
}

interface Props {
  open: boolean;
  variantName: string;
  onSave: (variant: Variant) => void;
  close: () => void;
}

export class IOSCertificateVariantForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      iosCertificate: '',
      filename: '',
      passphrase: '',
      production: false,
    };
  }

  render(): React.ReactNode {
    const save = () => {
      const variant = {
        name: this.props.variantName,
        certificate: this.state.iosCertificate,
        passphrase: this.state.passphrase,
        production: this.state.production,
      } as IOSVariant;
      this.props.onSave(variant);
    };

    if (!this.props.open) {
      return null;
    }
    const validator: Validator = validatorBuilder()
      .newRule()
      .withField('certificateFile')
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
      .withField('iosCertificatePassword')
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
      <Form className="iOSCertificateVariantForm">
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
            id="certificateFile"
            type={'dataURL'}
            value={this.state.iosCertificate}
            filename={this.state.filename}
            onChange={(value, filename) => {
              if (value && (value as string).length > 0) {
                const parsedCertificate = parseDataURL(value);
                const bufferedCert = Buffer.from(
                  parsedCertificate.body
                ).toString('base64');
                this.setState({ iosCertificate: bufferedCert, filename });
              }
            }}
            validated={
              !this.state.formValidation ||
              this.state.formValidation.isValid('certificate')
                ? 'success'
                : 'error'
            }
          />
        </FormGroup>
        <FormGroup label={'Type'} fieldId={'iOS-Certificate-Variant-Form-Type'}>
          <Radio
            className="radioBtn"
            id={'iOSCertificateProduction'}
            name="Production"
            label="Production"
            isChecked={this.state.production}
            onChange={checked => {
              this.setState({ production: checked });
            }}
          />
          <Radio
            className="radioBtn"
            id={'iOSCertificateDevelopment'}
            name="Development"
            label="Development"
            isChecked={!this.state.production}
            onChange={checked => {
              this.setState({ production: !checked });
            }}
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
            onChange={(value: string) => updateField('passphrase', value)}
            validated={
              !this.state.formValidation ||
              this.state.formValidation.isValid('passphrase')
                ? 'success'
                : 'error'
            }
          />
        </FormGroup>
        <div className="variantFormButtons">
          <Button
            onClick={save}
            className="dialogBtn"
            isDisabled={
              !this.props.variantName ||
              this.props.variantName.trim().length === 0 ||
              !this.state.iosCertificate ||
              !this.state.passphrase ||
              this.state.passphrase.trim().length === 0
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
