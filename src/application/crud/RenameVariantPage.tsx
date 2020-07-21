import React, { Component } from 'react';
import { UpsClientFactory } from '../../utils/UpsClientFactory';
import {
  Form,
  TextInput,
  FormGroup,
  Button,
  Modal,
} from '@patternfly/react-core';
import { PushApplication, Variant } from '@aerogear/unifiedpush-admin-client';
import { ApplicationListContext, ContextInterface } from '../../context/Context';

interface State {
  varName: string;
}

interface Props {
  app?: PushApplication;
  variant?: Variant;
  open: boolean;
  close: () => void;
}

export class RenameVariantPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      varName: '',
    };
  }

  private readonly editVariant = async (
    app: PushApplication,
    variant: Variant,
    providedName: string
  ) => {
    try {
      await UpsClientFactory.getUpsClient()
        .variants[variant.type].update(app.pushApplicationID, variant.variantID)
        .withName(providedName)
        .execute();
      this.props.close();
      (this.context as ContextInterface).refresh();
    } catch (err) {
      console.log(err);
    }
  };

  render(): React.ReactNode {

    const context = this.context as ContextInterface;

    return this.props.app ? (
      <Modal
        title="Update Variant Name"
        isOpen={this.props.open}
        onClose={this.props.close}
        variant={'small'}
      >
        <Form className="dialog-form">
          <FormGroup
            fieldId="simple-form-title"
            helperText={
              <>
                You are updating "<b>{context.selectedVariant?.name}</b>"?
              </>
            }
          ></FormGroup>
          <FormGroup
            helperText="Please type in the name of the Variant to confirm."
            fieldId="simple-form-input"
          >
            <TextInput
              className="formInput"
              defaultValue={this.props.app?.variants![0].name}
              onChange={value => this.setState({ varName: value })}
              isRequired
            />
          </FormGroup>
          <div className="formButtons">
            <Button
              className="dialogBtn"
              variant="primary"

              onClick={() =>
                this.editVariant(
                  this.props.app!,
                  context.selectedVariant!,
                  this.state.varName
                )
              }
            >
              Save
            </Button>
            <Button variant="secondary" onClick={() => this.props.close()}>
              Cancel
            </Button>
          </div>
        </Form>
      </Modal>
    ) : (
        <></>
      );
  }
}
RenameVariantPage.contextType = ApplicationListContext;