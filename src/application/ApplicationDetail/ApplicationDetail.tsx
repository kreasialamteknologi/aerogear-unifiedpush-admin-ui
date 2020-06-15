import React, { Component, ReactNode } from 'react';
import { PushApplication } from '@aerogear/unifiedpush-admin-client';
import { CubesIcon, MobileAltIcon, PlusIcon } from '@patternfly/react-icons';
import {
  Modal,
  Tabs,
  Tab,
  EmptyState,
  EmptyStateVariant,
  EmptyStateIcon,
  Title,
  EmptyStateBody,
  Button,
} from '@patternfly/react-core';

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
          <EmptyState variant={EmptyStateVariant.full}>
            <EmptyStateIcon icon={MobileAltIcon} />
            <Title headingLevel="h4" size="lg">
              There are no variants yet.
            </Title>
            <EmptyStateBody>
              The first step to set up your mobile device is to add a variants.
              That will generate the code necessary to register UPS on your
              device.
              <br />
              Learn more about variants in the{' '}
              <a href="https://aerogear.org/docs/unifiedpush/ups_userguide/index/#_create_and_manage_variants">
                documentation
              </a>
              .
            </EmptyStateBody>
            <Button variant="primary" icon={<PlusIcon />}>
              Add A Variant
            </Button>
          </EmptyState>
        </Tab>
      </Tabs>
    </Modal>
  );
}
