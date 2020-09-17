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
import {
  ApplicationListContext,
  ContextInterface,
} from '../../context/Context';

interface State {
  name: string;
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
    };
  }

  private readonly deleteApp = async (
    app: PushApplication,
    providedName: string
  ) => {
    try {
      if (providedName === app.name) {
        await UpsClientFactory.getUpsClient()
          .applications.delete()
          .withApplicationID(app.pushApplicationID)
          .execute();
        this.props.close();
      }
    } catch (err) {
      (this.context as ContextInterface).alert(err);
    }
  };

  render(): React.ReactNode {
    return this.props.app ? (
      <Modal
        title="Delete Application"
        isOpen={this.props.open}
        onClose={this.props.close}
        variant={'small'}
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
              id="app-name"
              className="formInput"
              onChange={value => this.setState({ name: value })}
              isRequired
            />
          </FormGroup>
          <div className="formButtons">
            <Button
              className="dialogBtn"
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
DeleteApplicationPage.contextType = ApplicationListContext;
