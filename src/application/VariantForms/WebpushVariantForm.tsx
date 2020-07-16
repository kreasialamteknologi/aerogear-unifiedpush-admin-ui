import React, { Component } from 'react';

import { TextInput, Button, Form, FormGroup } from '@patternfly/react-core';
import { Variant, WebPushVariant } from '@aerogear/unifiedpush-admin-client';

interface State {
  vapidPublicKey: string;
  vapidPrivateKey: string;
  alias: string;
}

interface Props {
  open: boolean;
  variantName: string;
  onSave: (variant: Variant) => void;
  close: () => void;
}

export class WebpushVariantForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      vapidPublicKey: '',
      vapidPrivateKey: '',
      alias: '',
    };
  }
  render(): React.ReactNode {
    const save = () => {
      const variant = {
        name: this.props.variantName,
        type: 'web_push',
        publicKey: this.state.vapidPublicKey,
        privateKey: this.state.vapidPrivateKey,
        alias: this.state.alias,
      } as WebPushVariant;
      this.props.onSave(variant);
    };

    if (!this.props.open) {
      return null;
    }
    return (
      <Form className="WebPushVariantForm">
        <FormGroup
          label={'Vapid Public Key'}
          fieldId={'Webpush-Variant-Form-Public-Key'}
        >
          <TextInput
            id="webpushVapidPublicKey"
            onChange={value => this.setState({ vapidPublicKey: value })}
            isRequired
          />
        </FormGroup>
        <FormGroup
          label={'Vapid Private Key'}
          fieldId={'Webpush-Variant-Form-Vapid-Private-Key'}
        >
          <TextInput
            id="webpushVapidPrivateKey"
            onChange={value => this.setState({ vapidPrivateKey: value })}
            isRequired
          />
        </FormGroup>
        <FormGroup label={'Alias'} fieldId={'Webpush-Variant-Form-Alias'}>
          <TextInput
            id="webpushAlias"
            onChange={value => this.setState({ alias: value })}
            isRequired
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
