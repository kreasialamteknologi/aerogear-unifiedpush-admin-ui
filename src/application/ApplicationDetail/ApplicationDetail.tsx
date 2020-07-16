import React, { Component } from 'react';
import { PushApplication } from '@aerogear/unifiedpush-admin-client';
import { NoVariantsPanel } from './panels/NoVariantsPanel';
import { Modal, Tabs, Tab } from '@patternfly/react-core';
import { VariantsPanel } from './panels/VariantsPanel';

interface Props {
  app?: PushApplication;
  show: boolean;
  onClose: (app: PushApplication) => void;
}

export class ApplicationDetail extends Component<Props> {
  render = () => (
    <Modal
      title={this.props.app?.name || ''}
      isOpen={this.props.show}
      onClose={() => this.props.onClose && this.props.onClose(this.props.app!)}
      // actions={[
      //     <Button key="confirm" variant="primary" onClick={this.handleModalToggle}>
      //         Confirm
      //     </Button>,
      //     <Button key="cancel" variant="link" onClick={this.handleModalToggle}>
      //         Cancel
      //     </Button>
      // ]}
    >
      <Tabs activeKey={0} isBox={true}>
        <Tab eventKey={0} title="Variants">
          <NoVariantsPanel app={this.props.app} />
          <VariantsPanel app={this.props.app} variantType="android" />
          <VariantsPanel app={this.props.app} variantType="ios_token" />
          <VariantsPanel app={this.props.app} variantType="ios" />
        </Tab>
      </Tabs>
    </Modal>
  );
}
