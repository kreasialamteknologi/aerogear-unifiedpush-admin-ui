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
}

interface Props {
  app?: PushApplication;
  open: boolean;
  close: () => void;
}

export class UpdateApplicationPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      // name: ''
      name: this.props.app!.name,
    };
  }

  private readonly updateApp = async (app: PushApplication, name: string) => {
    try {
      await UpsClientFactory.getUpsClient().applications.rename(
        app.pushApplicationID!,
        name
      );
      this.props.close();
    } catch (err) {
      console.log(err);
    }
  };

  render(): React.ReactNode {
    return this.props.app ? (
      <Modal
        isSmall
        title="Edit Application name"
        isOpen={this.props.open}
        onClose={this.props.close}
      >
        <Form className="dialog-form">
          <FormGroup fieldId="simple-form-title" helperText="Enter a new name">
            <TextInput
              className="formInput"
              // placeholder={this.props.app!.name}
              value={this.state.name}
              onChange={value => this.setState({ name: value })}
              isRequired
              css={''}
            />
          </FormGroup>
          <div className="formButtons">
            <Button
              className="editBtn"
              variant="primary"
              onClick={() => this.updateApp(this.props.app!, this.state.name)}
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
        <> </>
      );
  }
}
