import { Tab, Tabs, Text } from '@patternfly/react-core';
import { Title } from '../../../common/Title';
import { CodeSnippet } from '../CodeSnippet';
import { snippet as java_snippet } from '../snippets/sender/java';
import { snippet as node_snippet } from '../snippets/sender/node';
import { snippet as curl_snippet } from '../snippets/sender/curl';
import React, { useContext, useState } from 'react';
import { PushApplication } from '@aerogear/unifiedpush-admin-client';
import { getLink as _getLink } from '../../../utils/DocLinksUtils';
import {
  ApplicationListContext,
  ContextInterface,
} from '../../../context/Context';

interface Props {
  app: PushApplication;
}

export function SenderApiSnippets(props: Props) {
  const context = useContext<ContextInterface>(ApplicationListContext);
  const [activeTab, setActiveTab] = useState<string>('java-sender-api');

  const getLink = (key: string) => _getLink(context.upsConfig, key);

  return (
    <Tabs
      style={{ marginTop: 20 }}
      activeKey={activeTab}
      isBox={false}
      onSelect={(evt, key) => setActiveTab(key as string)}
    >
      <Tab eventKey={'java-sender-api'} title="Java Sender API">
        <Title headingLevel={'h1'}>Set up Java UPS Sender API</Title>
        <Text component={'small'}>
          First add <code className={'code'}>unifiedpush-java-client.jar</code>{' '}
          as a{' '}
          <a href={getLink('sender-api-java')}>
            dependency to your Java project
          </a>
          .
          <p>
            Then use the following snippet in your Java code to enable push
            notification sending.
          </p>
        </Text>
        <CodeSnippet app={props.app} language={'java'} snippet={java_snippet} />
        <Text component={'small'}>
          Read more on the details of the{' '}
          <a href={getLink('sender-api-java')}>
            Java UPS Sender API in documentation
          </a>
          .
          <p>
            If you have questions about this process,{' '}
            <a href={getLink('sender-api-java')}>
              visit the documentation for full step by step explanation
            </a>
            .
          </p>
        </Text>
      </Tab>
      <Tab eventKey={'node-sender-api'} title="Node.js Sender API">
        <Title headingLevel={'h1'}>Set up Node.js Sender API</Title>
        <Text component={'small'}>
          First add <code className={'code'}>unifiedpush-node-sender</code> as a{' '}
          <a href={getLink('sender-api-nodejs')}>dependency to your project</a>.
          <p>
            Then use the following snippet in your Node.js code to enable push
            notification sending.
          </p>
        </Text>
        <CodeSnippet
          app={props.app}
          language={'javascript'}
          snippet={node_snippet}
        />
        <Text component={'small'}>
          Read more on the details of the{' '}
          <a href={getLink('sender-api-nodejs')}>
            Node.js UPS Sender API in documentation
          </a>
          .
        </Text>
      </Tab>
      <Tab eventKey={'rest-sender-api'} title="REST Sender API (with CURL)">
        <Title headingLevel={'h1'}>Use UPS REST Sender API (with CURL)</Title>
        <Text component={'small'}>
          If none of the official client libs suit you or you just want to
          simply try out the notification sending, you can use the REST API
          directly.
          <p>
            Run the following <code className={'code'}>curl</code> command in a
            shell to send a notification to UPS server.
          </p>
        </Text>
        <CodeSnippet app={props.app} language={'bash'} snippet={curl_snippet} />
      </Tab>
    </Tabs>
  );
}
