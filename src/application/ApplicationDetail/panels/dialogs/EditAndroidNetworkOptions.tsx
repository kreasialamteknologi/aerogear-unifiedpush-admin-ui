import React, { Component } from 'react';
import {
  Variant,
  PushApplication,
  AndroidVariant,
} from '@aerogear/unifiedpush-admin-client';
import {
  Button,
  ButtonVariant,
  Modal,
  ModalVariant,
  Form,
  FormGroup,
  TextInput,
  ValidatedOptions,
} from '@patternfly/react-core';
import { UpsClientFactory } from '../../../../utils/UpsClientFactory';

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
      });
    }
  }

  readonly render = () => {
    const update = async () => {
      await this.setState({ updating: true });

      // make the call
      await UpsClientFactory.getUpsClient().variants.update(
        this.props.app.pushApplicationID!,
        {
          googleKey: this.state.googleKey || this.props.variant.googleKey,
          projectNumber:
            this.state.projectNumber || this.props.variant.projectNumber,
          variantID: this.props.variant.variantID!,
          type: this.props.variant.type,
        }
      );

      console.log('updated');

      this.props.variant.projectNumber =
        this.state.projectNumber || this.props.variant.projectNumber;
      this.props.variant.googleKey =
        this.state.googleKey || this.props.variant.googleKey;
      await this.setState({ updating: false });
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
