import { PushApplication, Variant } from '@aerogear/unifiedpush-admin-client';
import React, { Component } from 'react';
import { Tab, Tabs } from '@patternfly/react-core';
import { CodeSnippet } from '../../CodeSnippet';
import {
  cordova_snippet_ios,
  ios_snippet,
  react_native_ios,
  push_config_ios,
} from '../../snippets';

interface Props {
  app: PushApplication;
  variant: Variant;
}

interface State {
  activeCodeSnippets: string;
}

export class IOSCertCodeSnippets extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      activeCodeSnippets: 'swift',
    };
  }

  render = () => {
    if (this.props.variant.type !== 'ios') {
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
        <Tab eventKey={'swift'} title="Swift">
          <CodeSnippet
            variant={this.props.variant}
            language={'java'}
            snippet={ios_snippet}
          />
        </Tab>
        <Tab eventKey={'cordova'} title="Cordova">
          <CodeSnippet
            variant={this.props.variant}
            language={'javascript'}
            snippet={cordova_snippet_ios}
          />
        </Tab>
        <Tab eventKey={'react-native'} title="React-Native">
          <CodeSnippet
            variant={this.props.variant}
            language={'javascript'}
            snippet={react_native_ios}
          />
        </Tab>
        <Tab eventKey={'push-config'} title="push-config.json">
          <CodeSnippet
            variant={this.props.variant}
            language={'json'}
            snippet={push_config_ios}
          />
        </Tab>
      </Tabs>
    );
  };
}
