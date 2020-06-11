import React, { Component, ReactNode } from 'react';
import { PushApplication } from '@aerogear/unifiedpush-admin-client';
import { Modal, Tabs, Tab } from '@patternfly/react-core';

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
      <Tabs activeKey={0}>
        <Tab eventKey={0} title="Users">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Tab>
      </Tabs>
    </Modal>
  );
}
