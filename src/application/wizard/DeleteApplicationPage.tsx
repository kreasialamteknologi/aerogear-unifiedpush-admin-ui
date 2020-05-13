import React, { Component, ReactNode } from 'react';
import { UpsClientFactory } from '../../utils/UpsClientFactory';
import {
  Form,
  TextInput,
  FormGroup,
  Button,
  Modal,
} from '@patternfly/react-core';
import { PushApplication } from '@aerogear/unifiedpush-admin-client';

interface State {
  name: string;
  dialogModal: boolean;
}

interface Props {
  app?: PushApplication;
  open: boolean;
  close: () => void;
}

export class DeleteApplicationPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      name: '',
      dialogModal: true,
    };
  }

  private readonly deleteApp = async (
    app: PushApplication,
    providedName: string
  ) => {
    try {
      if (providedName === app.name) {
        await UpsClientFactory.getUpsClient().applications.delete({
          pushApplicationID: app.pushApplicationID,
        });
        this.props.close();
      }
    } catch (err) {
      console.log(err);
    }
  };

  render(): React.ReactNode {
    return this.props.app ? (
      <Modal
        isSmall
        title="Delete Application"
        isOpen={this.props.open}
        onClose={this.props.close}
      >
        <Form className="dialog-form">
          <FormGroup
            fieldId="simple-form-title"
            helperText={
              <>
                Are you sure you want to delete "<b>{this.props.app!.name}</b>"?
              </>
            }
          ></FormGroup>
          <FormGroup
            helperText="Please type in the name of the application to confirm."
            fieldId="simple-form-input"
          >
            <TextInput
              className="formInput"
              value={this.state.name}
              onChange={value => this.setState({ name: value })}
              isRequired
              css={''}
            />
          </FormGroup>
          <div className="formButtons">
            <Button
              className="deleteBtn"
              variant="danger"
              isDisabled={this.state.name !== this.props.app!.name}
              onClick={() => this.deleteApp(this.props.app!, this.state.name)}
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
  }
}
