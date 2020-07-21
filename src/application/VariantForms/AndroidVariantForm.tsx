import React, { Component } from 'react';

import { TextInput, Button, Form, FormGroup } from '@patternfly/react-core';
import { AndroidVariant, Variant } from '@aerogear/unifiedpush-admin-client';

interface State {
  serverKey: string;
  senderID: string;
}

interface Props {
  open: boolean;
  variantName: string;
  onSave: (variant: Variant) => void;
  close: () => void;
}

export class AndroidVariantForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      serverKey: '',
      senderID: '',
    };
  }

  render(): React.ReactNode {
    const save = () => {
      const variant = {
        name: this.props.variantName,
        type: 'android',
        googleKey: this.state.serverKey,
        projectNumber: this.state.senderID,
      } as AndroidVariant;
      this.props.onSave(variant);
    };

    if (!this.props.open) {
      return null;
    }
    return (
      <Form className="AndroidVariantForm">
        <FormGroup
          label={'Server Key'}
          fieldId={'Android-Variant-Form-Server-key'}
        >
          <TextInput
            id="android-serverKey"
            onChange={value => this.setState({ serverKey: value })}
            isRequired
          />
        </FormGroup>
        <FormGroup
          label={'Sender ID'}
          fieldId={'Android-Variant-Form-Sender-ID'}
        >
          <TextInput
            id="android-senderId"
            onChange={value => this.setState({ senderID: value })}
            isRequired
          />
        </FormGroup>
        <div className="variantFormButtons">
          <Button className="dialogBtn" onClick={save}>
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
