import React, { Component } from 'react';
import { RocketIcon } from '@patternfly/react-icons';

import {
  Bullseye,
  Button,
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  EmptyStateVariant,
  Form,
  InputGroup,
  TextInput,
  Title,
  WizardStep,
} from '@patternfly/react-core';
import { UpsClientFactory } from '../../utils/UpsClientFactory';
import { PushApplication } from '@aerogear/unifiedpush-admin-client';

interface State {
  appName: string;
}

interface Props {
  onFinished: (application: PushApplication) => void;
}

export class CreateApplicationPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      appName: '',
    };
  }

  private readonly createApp = async (name: string) => {
    try {
      const app = await UpsClientFactory.getUpsClient()
        .applications.create(name)
        .execute();
      this.props.onFinished(app);
    } catch (err) {
      console.log(err);
    }
  };

  render(): React.ReactNode {
    return (
      <EmptyState variant={EmptyStateVariant.full}>
        <EmptyStateIcon icon={RocketIcon} />
        <Title headingLevel="h5" size="lg">
          Create an application
        </Title>
        <EmptyStateBody>
          We will hold your hand and guide you all the way. Sit back and enjoy
          the ride. If you want to read about the process,{' '}
          <a
            href={
              'https://aerogear.org/docs/unifiedpush/ups_userguide/index/#_create_and_manage_pushapplication'
            }
          >
            go to the documentation.
          </a>
        </EmptyStateBody>
        <Bullseye>
          <Form style={{ width: 350, paddingTop: 20 }}>
            <InputGroup>
              <TextInput
                value={this.state.appName}
                onChange={value => this.setState({ appName: value })}
                isRequired
                placeholder={'Application name'}
                type="text"
                aria-label="Text Input for Application Name"
              />
              <Button
                variant="primary"
                isDisabled={
                  !this.state.appName || this.state.appName.trim().length === 0
                }
                onClick={() => this.createApp(this.state.appName)}
              >
                Create App
              </Button>
            </InputGroup>
          </Form>
        </Bullseye>
      </EmptyState>
    );
  }
}
