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
const parseDataURL = require('data-urls');

interface State {
  iosCertificate?: string;
  filename?: string;
  passphrase?: string;
  production: boolean;
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

    return (
      <Form className="iOSCertificateVariantForm">
        <FormGroup
          label={'APNS Certificate'}
          fieldId={'iOS-Certificate-Variant-Form'}
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
          label={'Passphrase'}
          fieldId={'iOS-Certificate-Variant-Form-PassPhrase'}
        >
          <TextInput
            id="iosCertificatePassword1"
            isRequired
            onChange={value => this.setState({ passphrase: value })}
          />
        </FormGroup>
        <div className="variantFormButtons">
          <Button onClick={save} className="dialogBtn">
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
