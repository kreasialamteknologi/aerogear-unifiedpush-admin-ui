import React, { Component } from 'react';
import { AndroidVariantForm } from './AndroidVariantForm';
import { WebpushVariantForm } from './WebpushVariantForm';
import { IOSTokenVariantForm } from './IOSTokenVariantForm';
import { IOSCertificateVariantForm } from './IOSCertificateForm';
import { Variant } from '@aerogear/unifiedpush-admin-client';

interface Props {
  type: string;
  name: string;
  onCancel: () => void;
  onSave: (variant: Variant) => void;
}

interface ModalProps extends Props {
  open: boolean;
}

class AbstractVariantEditForm<T extends Props> extends Component<T> {
  render() {
    return (
      <>
        <AndroidVariantForm
          open={this.props.type === 'android'}
          onSave={this.props.onSave}
          variantName={this.props.name}
          close={this.props.onCancel}
        />
        <WebpushVariantForm
          open={this.props.type === 'web_push'}
          onSave={this.props.onSave}
          variantName={this.props.name}
          close={this.props.onCancel}
        />
        <IOSTokenVariantForm
          open={this.props.type === 'ios_token'}
          onSave={this.props.onSave}
          variantName={this.props.name}
          close={this.props.onCancel}
        />
        <IOSCertificateVariantForm
          open={this.props.type === 'ios'}
          onSave={this.props.onSave}
          variantName={this.props.name}
          close={this.props.onCancel}
        />
      </>
    );
  }
}

export class VariantEditForm extends AbstractVariantEditForm<Props> {}
