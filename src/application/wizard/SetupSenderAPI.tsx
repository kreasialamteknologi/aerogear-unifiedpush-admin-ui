import {
  Button,
  ButtonVariant,
  Page,
  Text,
  TextContent,
  TextList,
  TextListItem,
  TextListItemVariants,
  TextListVariants,
} from '@patternfly/react-core';
import React from 'react';
import { PushApplication, Variant } from '@aerogear/unifiedpush-admin-client';
import { UpsClientFactory } from '../../utils/UpsClientFactory';
import { Secret } from '../../common/Secret';
import { SenderApiSnippets } from '../ApplicationDetail/senderapi-snippets-panel/SenderApiSnippets';

interface Props {
  app: PushApplication;
  variant: Variant;
  onFinished: () => void;
}

export function SetupSenderAPI(props: Props) {
  return (
    <>
      <Page>
        <TextContent>
          <Text component={'h1'}>
            <b>Backend: </b>Set up sender API
          </Text>
          <Text component={'small'}>
            <b>Last step!</b> Now that your mobile device is set up, let's make
            your backend server send notifications to this UnifiedPush Server
            using UPS Sender API:
          </Text>
        </TextContent>
        <TextContent style={{ marginTop: 20, marginBottom: 20 }}>
          <TextList component={TextListVariants.dl}>
            <TextListItem component={TextListItemVariants.dt}>
              Server URL
            </TextListItem>
            <TextListItem component={TextListItemVariants.dd}>
              {UpsClientFactory.getUPSServerURL()}
            </TextListItem>
            <TextListItem component={TextListItemVariants.dt}>
              Application ID
            </TextListItem>
            <TextListItem component={TextListItemVariants.dd}>
              {props.app.pushApplicationID}
            </TextListItem>
            <TextListItem component={TextListItemVariants.dt}>
              Master Secret
            </TextListItem>
            <TextListItem component={TextListItemVariants.dd}>
              <Secret text={props.app.masterSecret} />
            </TextListItem>
          </TextList>
        </TextContent>
      </Page>
      <SenderApiSnippets app={props.app} />
      <Button variant={ButtonVariant.primary} onClick={props.onFinished}>
        Next
      </Button>
    </>
  );
}
