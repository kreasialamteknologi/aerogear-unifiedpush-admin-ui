import React, { useEffect, useState } from 'react';
import { Variant, PushApplication } from '@aerogear/unifiedpush-admin-client';
import { RedoIcon } from '@patternfly/react-icons';
import {
  Button,
  ButtonVariant,
  Label,
  Text,
  TextContent,
  TextList,
  TextListItem,
  TextListItemVariants,
  TextListVariants,
  TextVariants,
} from '@patternfly/react-core';
import { UpsClientFactory } from '../../../utils/UpsClientFactory';
import { RenewVariantSecret } from './dialogs/RenewVariantSecret';
import { AndroidVariantDetails } from './android/AndroidVariantDetails';
import { AndroidCodeSnippets } from './android/AndroidCodeSnippets';
import { IOSTokenVariantDetails } from './ios_token/iOSTokenVariantDetails';
import { IOSTokenCodeSnippets } from './ios_token/iOSTokenCodeSnippets';
import { IOSCertVariantDetails } from './ios_cert/iOSCertVariantDetails';
import { IOSCertCodeSnippets } from './ios_cert/iOSCertCodeSnippets';
import { WebPushVariantDetails } from './web_push/WebPushVariantDetails';
import { WebPushCodeSnippets } from './web_push/WebPushCodeSnippets';
import { Secret } from '../../../common/Secret';
import { Config, UpsConfig } from '../../../utils/Config';
import { getLink } from '../../../utils/DocLinksUtils';

interface Props {
  app: PushApplication;
  variant: Variant;
}

interface State {
  refreshSecret?: boolean;
  editNetworkOptions?: boolean;
  docLinks?: UpsConfig;
}

export function VariantDetails(props: Props) {
  const [refreshSecret, openRefreshSecretDialog] = useState<boolean>(false);
  const [docLinks, setDocLinks] = useState<UpsConfig>({});

  useEffect(() => {
    (async () => setDocLinks(await Config.getInstance().getDocsConfig()))();
  });

  const intro = () => {
    switch (props.variant.type) {
      case 'android':
        return (
          <Text component={TextVariants.small}>
            Firebase's Cloud Messaging Network (FCM) will be used. To learn more
            about FCM, visit our{' '}
            <Label color="blue" href={getLink(docLinks, 'docs-push-android')}>
              Android
            </Label>{' '}
            or{' '}
            <Label color="blue" href={getLink(docLinks, 'docs-push-cordova')}>
              Apache Cordova{' '}
            </Label>{' '}
            guides for push.
          </Text>
        );
      case 'ios':
      case 'ios_token':
        return (
          <Text component={TextVariants.small}>
            Apple's Push Network (APNs) will be used. To learn more about APNs,
            visit our{' '}
            <Label color="blue" href={getLink(docLinks, 'docs-push-ios')}>
              iOS
            </Label>{' '}
            or{' '}
            <Label color="blue" href={getLink(docLinks, 'docs-push-cordova')}>
              Apache Cordova
            </Label>{' '}
            guides for push.
          </Text>
        );
      case 'web_push':
        return (
          <Text component={TextVariants.small}>
            Your user's browser will determine the services used.
          </Text>
        );
      default:
        return <Text component={TextVariants.small} />;
    }
  };

  const onRefreshed = (variant: Variant) => {
    props.variant.secret = variant.secret;
    openRefreshSecretDialog(false);
  };

  return (
    <>
      <RenewVariantSecret
        visible={refreshSecret}
        app={props.app}
        variant={props.variant}
        onCancel={() => openRefreshSecretDialog(false)}
        onRefreshed={onRefreshed}
      />
      <TextContent style={{ marginBottom: 20 }}>
        {intro()}
        <TextList component={TextListVariants.dl}>
          <TextListItem component={TextListItemVariants.dt}>
            Server URL:
          </TextListItem>
          <TextListItem component={TextListItemVariants.dd}>
            {UpsClientFactory.getUPSServerURL()}
          </TextListItem>
          <TextListItem component={TextListItemVariants.dt}>
            Variant ID:
          </TextListItem>
          <TextListItem component={TextListItemVariants.dd}>
            {props.variant.variantID}
          </TextListItem>
          <TextListItem component={TextListItemVariants.dt}>
            Variant Secret:
          </TextListItem>
          <TextListItem component={TextListItemVariants.dd}>
            <Secret text={props.variant.secret} />
          </TextListItem>

          <TextListItem component={TextListItemVariants.dd}>
            <Button
              className={'button-small'}
              icon={<RedoIcon />}
              variant={ButtonVariant.secondary}
              onClick={() => openRefreshSecretDialog(true)}
            >
              Renew Variant Secret
            </Button>
          </TextListItem>
        </TextList>

        <AndroidVariantDetails app={props.app} variant={props.variant} />

        <IOSTokenVariantDetails app={props.app} variant={props.variant} />

        <IOSCertVariantDetails app={props.app} variant={props.variant} />

        <WebPushVariantDetails app={props.app} variant={props.variant} />
      </TextContent>
      <AndroidCodeSnippets app={props.app} variant={props.variant} />
      <IOSTokenCodeSnippets app={props.app} variant={props.variant} />
      <IOSCertCodeSnippets app={props.app} variant={props.variant} />
      <WebPushCodeSnippets app={props.app} variant={props.variant} />
    </>
  );
}
