import React, { Component } from 'react';
import {
  TextInput,
  Button,
  Form,
  FormGroup,
  Radio,
  TextArea,
} from '@patternfly/react-core';
import { Variant, IOSTokenVariant } from '@aerogear/unifiedpush-admin-client';

interface State {
  privateKey: string;
  keyId: string;
  teamId: string;
  bundleId: string;
  production: boolean;
}

interface Props {
  open: boolean;
  variantName: string;
  onSave: (variant: Variant) => void;
  close: () => void;
}

export class IOSTokenVariantForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      privateKey: '',
      keyId: '',
      teamId: '',
      bundleId: '',
      production: false,
    };
  }

  render(): React.ReactNode {
    const save = () => {
      const variant = {
        name: this.props.variantName,
        type: 'ios_token',
        privateKey: this.state.privateKey,
        keyId: this.state.keyId,
        teamId: this.state.teamId,
        bundleId: this.state.bundleId,
        production: this.state.production,
      } as IOSTokenVariant;
      this.props.onSave(variant);
    };

    if (!this.props.open) {
      return null;
    }

    return (
      <Form className="ios TokenVariantForm">
        <FormGroup
          label={'Private Key'}
          fieldId={'iOS-Token-Variant-Form-Private-Key'}
        >
          <TextArea
            id="iosTokenPrivateKey"
            onChange={value => this.setState({ privateKey: value })}
            isRequired
          />
        </FormGroup>
        <FormGroup label={'Key Id'} fieldId={'iOS-Token-Variant-Form-Key-Id'}>
          <TextInput
            id="iosTokenKeyId"
            onChange={value => this.setState({ keyId: value })}
            isRequired
          />
        </FormGroup>
        <FormGroup label={'Team Id'} fieldId={'iOS-Token-Variant-Form-Team-Id'}>
          <TextInput
            id="iosTokenTeamId"
            onChange={value => this.setState({ teamId: value })}
            isRequired
          />
        </FormGroup>
        <FormGroup
          label={'Bundle Id'}
          fieldId={'iOS-Token-Variant-Form-Bundle-Id'}
        >
          <TextInput
            id="iosBundleId"
            onChange={value => this.setState({ bundleId: value })}
            isRequired
          />
        </FormGroup>
        <FormGroup label={'Type'} fieldId={'iOS-Token-Variant-Form-Type'}>
          <Radio
            className="radioBtn"
            id={'iOSTokenProduction'}
            name="Production"
            label="Production"
            isChecked={this.state.production}
            onChange={checked => {
              this.setState({ production: checked });
            }}
          />
          <Radio
            className="radioBtn"
            id={'iOSTokenDevelopment'}
            name="Development"
            label="Development"
            isChecked={!this.state.production}
            onChange={checked => {
              this.setState({ production: !checked });
            }}
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
