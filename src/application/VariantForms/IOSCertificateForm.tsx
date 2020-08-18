import React, { Component } from 'react';
import {
  TextInput,
  Button,
  Form,
  FormGroup,
  FileUpload,
  Switch,
} from '@patternfly/react-core';
import { Variant, IOSVariant } from '@aerogear/unifiedpush-admin-client';
import {
  validatorBuilder,
  RuleBuilder,
  Data,
  Validator,
} from 'json-data-validator';
import { MultiEvaluationResult } from 'json-data-validator/build/src/Rule';
import { formIsValid, validatorToPF4Status } from '../../utils/ValidatorUtils';

interface State {
  iosCertificate?: string;
  filename?: string;
  passphrase?: string;
  production: boolean;
  formValidation?: MultiEvaluationResult | null;
}

interface Props {
  open: boolean;
  variantName: string;
  onSave: (variant: Variant) => void;
  close: () => void;
}

const initialState: State = {
  iosCertificate: '',
  filename: '',
  passphrase: '',
  production: false,
  formValidation: null,
};

export class IOSCertificateVariantForm extends Component<Props, State> {
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
      const variant = {
        name: this.props.variantName,
        certificate: this.state.iosCertificate!.substr(
          'data:application/x-pkcs12;base64,'.length
        ),
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
      .withField('iosCertificate')
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
      <Form className="iOSCertificateVariantForm" isHorizontal>
        <FormGroup
          fieldId={'Push Network'}
          label={'Push Network'}
          helperText={'Apple Push Notification Service certificate'}
          helperTextInvalid={'Selected file must be a PKCS#12 file (.p12)'}
          validated={validatorToPF4Status(
            this.state.formValidation,
            'iosCertificate'
          )}
        >
          <FileUpload
            id="certificateFile"
            type={'dataURL'}
            value={this.state.iosCertificate}
            filename={this.state.filename}
            onChange={(value, filename) => {
              updateField('iosCertificate', value as string);
              updateField('filename', filename);
            }}
            validated={validatorToPF4Status(
              this.state.formValidation,
              'iosCertificate'
            )}
          />
        </FormGroup>
        <FormGroup
          fieldId={'Push Network'}
          helperText={'passphrase'}
          helperTextInvalid={
            this.state.formValidation?.getEvaluationResult('passphrase')
              ?.message
          }
          validated={validatorToPF4Status(
            this.state.formValidation,
            'passphrase'
          )}
        >
          <TextInput
            id="certificate-password"
            type="password"
            onChange={(value: string) => updateField('passphrase', value)}
            validated={validatorToPF4Status(
              this.state.formValidation,
              'passphrase'
            )}
          />
        </FormGroup>
        <FormGroup fieldId={'iOS-Certificate-Variant-Form-Type'}>
          <Switch
            id="simple-switch"
            label="Production"
            labelOff="Development"
            isChecked={this.state.production}
            onChange={() => {
              this.setState({ production: !this.state.production });
              this.setState(({
                production: !this.state.production,
              } as unknown) as State);
            }}
          />
        </FormGroup>
        <div className="variantFormButtons">
          <Button
            onClick={save}
            className="dialogBtn"
            isDisabled={
              !this.props.variantName ||
              this.props.variantName.trim().length === 0 ||
              !formIsValid(this.state.formValidation)
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
