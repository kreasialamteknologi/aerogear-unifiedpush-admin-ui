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
  variant: Variant;
  onCancel: () => void;
  onRefreshed: (variant: Variant) => void;
}

interface State {
  refreshing: boolean;
  nameValid: ValidatedOptions;
}

export class RenewVariantSecret extends Component<Props, State> {
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

      const variant = await UpsClientFactory.getUpsClient()
        .variants[this.props.variant.type].renewSecret(
          this.props.app.pushApplicationID,
          this.props.variant.variantID
        )
        .execute();
      console.log({ old: this.props.variant, new: variant });
      await this.setState({ refreshing: false });
      this.props.onRefreshed(variant);
    };

    const handleAppNameInput = (value: string) => {
      console.log('verify', value);
      if (value === this.props.variant.name) {
        this.setState({ nameValid: ValidatedOptions.success });
      } else {
        this.setState({ nameValid: ValidatedOptions.error });
      }
    };

    return (
      <Modal
        variant={ModalVariant.small}
        title="Renew Variant Secret"
        description={`You are about to change the variant secret for variant "${this.props.variant.name}"!`}
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
          Be aware that this cannot be undone and you'll have to change secret
          on all the installed devices in order to continue receiving push
          notifications.
        </Text>

        <TextInput
          onChange={handleAppNameInput}
          isRequired
          validated={this.state.nameValid}
          type="text"
          aria-label="invalid text input example"
        />
        <Text component={TextVariants.small}>
          Please type in the name of the variant to confirm.
        </Text>
      </Modal>
    );
  };
}
