import { PushApplication, Variant } from '@aerogear/unifiedpush-admin-client';
import React, { Component } from 'react';
import { Tab, Tabs } from '@patternfly/react-core';
import { CodeSnippet } from '../../CodeSnippet';
import { push_config_webpush } from '../../snippets';

interface Props {
  app: PushApplication;
  variant: Variant;
}

interface State {
  activeCodeSnippets: string;
}

export class WebPushCodeSnippets extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      activeCodeSnippets: 'push-config',
    };
  }

  render = () => {
    if (this.props.variant.type !== 'web_push') {
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
        <Tab eventKey={'push-config'} title="push-config.json">
          <CodeSnippet
            variant={this.props.variant}
            language={'json'}
            snippet={push_config_webpush}
          />
        </Tab>
      </Tabs>
    );
  };
}
