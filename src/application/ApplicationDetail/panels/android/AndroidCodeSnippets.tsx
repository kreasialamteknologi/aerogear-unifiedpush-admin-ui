import { PushApplication, Variant } from '@aerogear/unifiedpush-admin-client';
import React, { Component } from 'react';
import { Tab, Tabs } from '@patternfly/react-core';
import { CodeSnippet } from '../../CodeSnippet';
import {
  cordova_snippet_android,
  java_snippet,
  push_config_android,
  react_native_android,
} from '../../snippets';

interface Props {
  app: PushApplication;
  variant: Variant;
}

interface State {
  activeCodeSnippets: string;
}

export class AndroidCodeSnippets extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      activeCodeSnippets: 'java',
    };
  }

  render = () => {
    if (this.props.variant.type !== 'android') {
      return null;
    }

    const onTabSelect = (codeSnippetTab: string) => {
      this.setState({ activeCodeSnippets: codeSnippetTab });
    };

    return (
      <Tabs
        isFilled
        activeKey={this.state.activeCodeSnippets}
        isBox={false}
        onSelect={(
          event: React.MouseEvent<HTMLElement, MouseEvent>,
          eventKey: number | string
        ) => onTabSelect(eventKey as string)}
      >
        <Tab eventKey={'java'} title="Android">
          <CodeSnippet
            variant={this.props.variant}
            language={'java'}
            snippet={java_snippet}
          />
        </Tab>
        <Tab eventKey={'cordova'} title="Cordova">
          <CodeSnippet
            variant={this.props.variant}
            language={'javascript'}
            snippet={cordova_snippet_android}
          />
        </Tab>
        <Tab eventKey={'react-native'} title="React-Native">
          <CodeSnippet
            variant={this.props.variant}
            language={'javascript'}
            snippet={react_native_android}
          />
        </Tab>
        <Tab eventKey={'push-config'} title="push-config.json">
          <CodeSnippet
            variant={this.props.variant}
            language={'json'}
            snippet={push_config_android}
          />
        </Tab>
      </Tabs>
    );
  };
}
