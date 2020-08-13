import React, { Component, ReactNode } from 'react';
import { AndroidVariantForm } from './AndroidVariantForm';
import { WebpushVariantForm } from './WebpushVariantForm';
import { IOSTokenVariantForm } from './IOSTokenVariantForm';
import { IOSCertificateVariantForm } from './IOSCertificateForm';
import { Variant, VariantType } from '@aerogear/unifiedpush-admin-client';
import { Modal, ModalVariant } from '@patternfly/react-core';

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

export class VariantEditFormModal extends AbstractVariantEditForm<ModalProps> {
  render = () => {
    return (
      <Modal
        variant={ModalVariant.large}
        title={'Add Variant'}
        isOpen={this.props.open}
        onClose={this.props.onCancel}
      >
        {super.render()}
      </Modal>
    );
  };
}
