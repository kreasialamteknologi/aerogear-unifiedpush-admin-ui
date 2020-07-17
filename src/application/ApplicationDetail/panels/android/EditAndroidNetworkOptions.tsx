import React, { Component } from 'react';
import {
  AndroidVariant,
  PushApplication,
  Variant,
} from '@aerogear/unifiedpush-admin-client';
import {
  Button,
  ButtonVariant,
  Form,
  FormGroup,
  Modal,
  ModalVariant,
  TextInput,
  ValidatedOptions,
} from '@patternfly/react-core';
import { UpsClientFactory } from '../../../../utils/UpsClientFactory';
import {
  ApplicationListContext,
  ContextInterface,
} from '../../../../context/Context';

interface Props {
  visible: boolean;
  app: PushApplication;
  variant: AndroidVariant;
  onCancel: () => void;
  onSaved: (variant: Variant) => void;
}

interface State {
  updating: boolean;
  nameValid: ValidatedOptions;
  googleKey?: string;
  projectNumber?: string;
}

export class EditAndroidNetworkOptions extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      updating: false,
      nameValid: ValidatedOptions.error,
    };
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>) {
    if (this.props.visible && prevProps.visible !== this.props.visible) {
      this.setState({
        updating: false,
        nameValid: ValidatedOptions.error,
        googleKey: undefined,
        projectNumber: undefined,
      });
    }
  }

  readonly render = () => {
    const context = this.context as ContextInterface;

    const update = async () => {
      await this.setState({ updating: true });

      // make the call
      try {
        await UpsClientFactory.getUpsClient()
          .variants.android.update(
            this.props.app.pushApplicationID!,
            this.props.variant.variantID
          )
          .withGoogleKey(this.state.googleKey || this.props.variant.googleKey)
          .withProjectNumber(
            this.state.projectNumber || this.props.variant.projectNumber
          )
          .execute();

        this.props.variant.projectNumber =
          this.state.projectNumber || this.props.variant.projectNumber;
        this.props.variant.googleKey =
          this.state.googleKey || this.props.variant.googleKey;
        await this.setState({ updating: false });
      } catch (err) {
        context.alert(err);
      }
      this.props.onSaved(this.props.variant);
    };
    return (
      <Modal
        variant={ModalVariant.small}
        title="Edit Variant"
        isOpen={this.props.visible}
        onClose={this.props.onCancel}
        actions={[
          <Button
            key="confirm"
            variant={ButtonVariant.primary}
            onClick={update}
          >
            Save
          </Button>,
          <Button key="cancel" variant="link" onClick={this.props.onCancel}>
            Cancel
          </Button>,
        ]}
      >
        <Form isHorizontal>
          <FormGroup
            fieldId={'Push Network'}
            label={'Push Network'}
            helperText={'Server Key'}
          >
            <TextInput
              type="text"
              defaultValue={this.props.variant.googleKey}
              onChange={value => this.setState({ googleKey: value })}
            />
          </FormGroup>
          <FormGroup fieldId={'Push Network'} helperText={'Sender ID'}>
            <TextInput
              type="text"
              defaultValue={this.props.variant.projectNumber}
              onChange={value => this.setState({ projectNumber: value })}
            />
          </FormGroup>
        </Form>
      </Modal>
    );
  };
}
EditAndroidNetworkOptions.contextType = ApplicationListContext;
