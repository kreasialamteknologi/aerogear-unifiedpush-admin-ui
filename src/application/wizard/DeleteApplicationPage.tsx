import React, { Component, ReactNode } from 'react';
import { UpsClientFactory } from '../../utils/UpsClientFactory';
import {
  Form,
  TextInput,
  FormGroup,
  Button,
  EmptyState,
} from '@patternfly/react-core';
import { PushApplication } from '@aerogear/unifiedpush-admin-client';


interface State {
  name: string;
  dialogModal: boolean;
}

interface Props {
  app?: PushApplication;
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
    return (
      <EmptyState>
        <Form>
          <FormGroup
            label="Delete Application"
            fieldId="simple-form-title"
            helperText={`Do you want to delete ${this.props.app!.name}`}
          ></FormGroup>
          <FormGroup
            label="please type in the name of the application to confirm"
            fieldId="simple-form-input"
          >
            <TextInput
              value={this.state.name}
              onChange={value => this.setState({ name: value })}
              isRequired
              css={''}
            />
          </FormGroup>
          <Button
            variant="primary"
            isDisabled={this.state.name !== this.props.app!.name}
            onClick={() => this.deleteApp(this.props.app!, this.state.name)}
          >
            Delete App
          </Button>
        </Form>
      </EmptyState>
    );
  }
}
