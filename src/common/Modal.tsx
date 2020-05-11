import React, { ReactNode, Component } from 'react';
import { Modal, Title, TitleLevel, BaseSizes } from '@patternfly/react-core';

interface Props {
  open: boolean;
  close: () => void;
}

export class DialogModal extends Component<Props> {
  render(): React.ReactNode {
    return (
      <Modal
        isLarge
        hideTitle={true}
        title="is hidden"
        isOpen={this.props.open}
        onClose={this.props.close}
      >
        {this.props.children}
      </Modal>
    );
  }
}
