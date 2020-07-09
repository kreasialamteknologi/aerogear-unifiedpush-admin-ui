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
  name?: string;
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
      name: this.props.app?.name,
    };
  }

  private readonly updateApp = async (app: PushApplication, name: string) => {
    try {
      await UpsClientFactory.getUpsClient()
        .applications.update(app.pushApplicationID)
        .withName(name)
        .execute();
      this.props.close();
    } catch (err) {
      console.log(err);
    }
  };

  render(): React.ReactNode {
    return this.props.app ? (
      <Modal
        title="Edit Application name"
        isOpen={this.props.open}
        onClose={this.props.close}
        variant={'small'}
      >
        <Form className="dialog-form">
          <FormGroup fieldId="simple-form-title" helperText="Enter a new name">
            <TextInput
              className="formInput"
              defaultValue={this.props.app?.name}
              onChange={value => this.setState({ name: value })}
              isRequired
            />
          </FormGroup>
          <div className="formButtons">
            <Button
              className="dialogBtn"
              variant="primary"
              onClick={() => this.updateApp(this.props.app!, this.state.name!)}
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
