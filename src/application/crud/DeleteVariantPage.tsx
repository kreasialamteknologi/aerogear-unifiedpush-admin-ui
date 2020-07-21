import React, { Component } from 'react';
import { UpsClientFactory } from '../../utils/UpsClientFactory';
import {
  Form,
  TextInput,
  FormGroup,
  Button,
  Modal,
} from '@patternfly/react-core';
import { PushApplication, Variant, VariantType } from '@aerogear/unifiedpush-admin-client';
import { ApplicationListContext, ContextInterface } from '../../context/Context';

interface State {
  varName: string;
}

interface Props {
  app: PushApplication;
  variant?: Variant;
  open: boolean;
  close: () => void;
}

export class DeleteVariantPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      varName: '',
    };
  }

  private readonly deleteVariant = async (
    app: PushApplication,
    variant: Variant,
    providedName: string
  ) => {
    try {
      if (providedName === variant.name) {
        await UpsClientFactory.getUpsClient()
          .variants.delete(app.pushApplicationID)
          .withName(providedName)
          .execute();
        // this.props.app.variants = this.props.app!.variants!.filter(filteredVar => filteredVar.variantID !== variant.variantID);
        this.props.close();
        (this.context as ContextInterface).refresh();
      }
    } catch (err) {
      console.log(err);
    }
  };

  render(): React.ReactNode {

    const context = this.context as ContextInterface;

    return this.props.app ? (
      <Modal
        title="Delete Variant"
        isOpen={this.props.open}
        onClose={this.props.close}
        variant={'small'}
      >
        <Form className="dialog-form">
          <FormGroup
            fieldId="simple-form-title"
            helperText={
              <>
                Are you sure you want to delete "<b>{context.selectedVariant?.name}</b>"?
              </>
            }
          ></FormGroup>
          <FormGroup
            helperText="Please type in the name of the Variant to confirm."
            fieldId="simple-form-input"
          >
            <TextInput
              className="formInput"
              onChange={value => this.setState({ varName: value })}
              isRequired
            />
          </FormGroup>
          <div className="formButtons">
            <Button
              className="dialogBtn"
              variant="danger"
              isDisabled={this.state.varName !== context.selectedVariant?.name}
              onClick={() =>
                this.deleteVariant(
                  this.props.app!,
                  context.selectedVariant!,
                  this.state.varName,
                )
              }

            >
              Delete
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

  };
}
DeleteVariantPage.contextType = ApplicationListContext;