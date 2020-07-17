import React, { Component } from 'react';
import { Variant, PushApplication } from '@aerogear/unifiedpush-admin-client';
import {
  Button,
  ButtonVariant,
  Modal,
  ModalVariant,
  Text,
  TextInput,
  TextVariants,
  ValidatedOptions,
} from '@patternfly/react-core';
import { UpsClientFactory } from '../../../../utils/UpsClientFactory';

interface Props {
  visible: boolean;
  app: PushApplication;
  onCancel: () => void;
  onRefreshed: (app: PushApplication) => void;
}

interface State {
  refreshing: boolean;
  nameValid: ValidatedOptions;
}

export class RenewApplicationSecret extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      refreshing: false,
      nameValid: ValidatedOptions.error,
    };
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>) {
    if (this.props.visible && prevProps.visible !== this.props.visible) {
      this.setState({
        refreshing: false,
        nameValid: ValidatedOptions.error,
      });
    }
  }

  readonly render = () => {
    const refresh = async () => {
      await this.setState({ refreshing: true });

      // make the call

      const app = await UpsClientFactory.getUpsClient()
        .applications.renewSecret(this.props.app.pushApplicationID)
        .execute();
      await this.setState({ refreshing: false });
      this.props.onRefreshed(app);
    };

    const handleAppNameInput = (value: string) => {
      if (value === this.props.app.name) {
        this.setState({ nameValid: ValidatedOptions.success });
      } else {
        this.setState({ nameValid: ValidatedOptions.error });
      }
    };

    return (
      <Modal
        variant={ModalVariant.large}
        title="Renew Variant Secret"
        description={`You are about to change the master secret for application "${this.props.app.name}"!`}
        isOpen={this.props.visible}
        onClose={this.props.onCancel}
        actions={[
          <Button
            isDisabled={
              this.state.refreshing ||
              this.state.nameValid !== ValidatedOptions.success
            }
            key="confirm"
            variant={ButtonVariant.danger}
            onClick={refresh}
          >
            Renew Variant Secret
          </Button>,
          <Button key="cancel" variant="link" onClick={this.props.onCancel}>
            Cancel
          </Button>,
        ]}
      >
        <Text component={TextVariants.small}>
          Be aware that this cannot be undone and you'll have to change your
          sender in order to continue sending push notifications.
        </Text>

        <TextInput
          onChange={handleAppNameInput}
          isRequired
          validated={this.state.nameValid}
          type="text"
          aria-label="invalid text input example"
        />
        <Text component={TextVariants.small}>
          Please type in the name of the application to confirm.
        </Text>
      </Modal>
    );
  };
}
