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
} from '@patternfly/react-core';

interface State {
  appName: string;
}

export class CreateApplicationPage extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      appName: '',
    };
  }

  render(): React.ReactNode {
    return (
      <EmptyState variant={EmptyStateVariant.full}>
        <EmptyStateIcon icon={RocketIcon} />
        <Title headingLevel="h5" size="lg">
          Create your an application
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
                css={''}
                type="text"
                aria-label="text input example"
              />
              <Button
                variant="primary"
                isDisabled={
                  !this.state.appName || this.state.appName.trim().length === 0
                }
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
