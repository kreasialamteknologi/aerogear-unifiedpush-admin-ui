import React, { Component } from 'react';
import { PushApplication } from '@aerogear/unifiedpush-admin-client';
import { NoVariantsPanel } from './panels/NoVariantsPanel';
import { Modal, Tabs, Tab } from '@patternfly/react-core';
import { VariantsPanel } from './panels/VariantsPanel';
import { SenderAPI } from './SenderAPI';

interface Props {
  app?: PushApplication;
  show: boolean;
  onClose: (app: PushApplication) => void;
}

interface State {
  activeTab: number;
}

export class ApplicationDetail extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      activeTab: 0,
    };
  }

  render = () => {
    const onTabSelect = (tabKey: number) => {
      this.setState({ activeTab: tabKey });
    };

    return (
      <Modal
        title={this.props.app?.name || ''}
        isOpen={this.props.show}
        onClose={() =>
          this.props.onClose && this.props.onClose(this.props.app!)
        }
      >
        <Tabs
          activeKey={this.state.activeTab}
          isBox={true}
          onSelect={(evt, key) => onTabSelect(key as number)}
        >
          <Tab eventKey={0} title="Variants">
            <NoVariantsPanel app={this.props.app} />
            <VariantsPanel app={this.props.app} variantType="android" />
            <VariantsPanel app={this.props.app} variantType="ios" />
            <VariantsPanel app={this.props.app} variantType="ios_token" />
            <VariantsPanel app={this.props.app} variantType="web_push" />
          </Tab>
          <Tab eventKey={1} title="Sender API">
            <SenderAPI app={this.props.app!} />
          </Tab>
        </Tabs>
      </Modal>
    );
  };
}
