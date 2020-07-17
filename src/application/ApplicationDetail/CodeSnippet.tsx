import React, { Component } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { UpsClientFactory } from '../../utils/UpsClientFactory';
import {
  AndroidVariant,
  PushApplication,
  Variant,
  WebPushVariant,
} from '@aerogear/unifiedpush-admin-client';

interface Props {
  variant?: Variant;
  app?: PushApplication;
  language: string;
  snippet: string;
  maxHeight?: number;
}

export class CodeSnippet extends Component<Props> {
  private readonly maxHeight: number;

  constructor(props: Props) {
    super(props);
    this.maxHeight = this.props.maxHeight || 300;
  }

  readonly render = () => {
    const replacePlaceHolders = (template: string) =>
      template
        .replace(
          '__PUSHAPPLICATIONID__',
          this.props.app?.pushApplicationID ?? ''
        )
        .replace('__MASTERSECRET__', this.props.app?.masterSecret ?? '')
        .replace('__VARIANTID__', this.props.variant?.variantID ?? '')
        .replace('__VARIANT_SECRET__', this.props.variant?.secret ?? '')
        .replace(
          '__VAPID_PUBLIC_KEY__',
          (this.props.variant as WebPushVariant)?.publicKey || ''
        )
        .replace(
          '__SENDERID__',
          (this.props.variant as AndroidVariant)?.projectNumber || ''
        )
        .replace('__SERVERURL__', UpsClientFactory.getUPSServerURL());

    return (
      <div style={{ maxHeight: this.maxHeight, overflow: 'auto' }}>
        <SyntaxHighlighter
          style={docco}
          customStyle={{ fontSize: 13 }}
          language={this.props.language}
        >
          {replacePlaceHolders(this.props.snippet)}
        </SyntaxHighlighter>
      </div>
    );
  };
}
