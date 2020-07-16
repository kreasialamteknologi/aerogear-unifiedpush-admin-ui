import React, { Component } from 'react';
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
import { links } from '../../../links';
import { IOSTokenVariantDetails } from './ios_token/iOSTokenVariantDetails';
import { IOSTokenCodeSnippets } from './ios_token/iOSTokenCodeSnippets';
import { IOSCertVariantDetails } from './ios_cert/iOSCertVariantDetails';
import { IOSCertCodeSnippets } from './ios_cert/iOSCertCodeSnippets';

interface Props {
  app: PushApplication;
  variant: Variant;
}

interface State {
  activeCodeSnippets: string;
  refreshSecret?: boolean;
  editNetworkOptions?: boolean;
}

export class VariantDetails extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      activeCodeSnippets: 'java',
    };
  }

  render = () => {
    const intro = () => {
      switch (this.props.variant.type) {
        case 'android':
          return (
            <Text component={TextVariants.small}>
              Firebase's Cloud Messaging Network (FCM) will be used. To learn
              more about FCM, visit our{' '}
              <Label
                color="blue"
                href={links.pushApplications.variants.android.docs.java_client}
              >
                Android
              </Label>{' '}
              or{' '}
              <Label
                color="blue"
                href={
                  links.pushApplications.variants.android.docs.cordova_client
                }
              >
                Apache Cordova{' '}
              </Label>{' '}
              guides for push.
            </Text>
          );
        case 'ios':
        case 'ios_token':
          return (
            <Text component={TextVariants.small}>
              Apple's Push Network (APNs) will be used. To learn more about
              APNs, visit our{' '}
              <Label
                color="blue"
                href={links.pushApplications.variants.ios_token.docs.ios_client}
              >
                iOS
              </Label>{' '}
              or{' '}
              <Label
                color="blue"
                href={
                  links.pushApplications.variants.ios_token.docs.cordova_client
                }
              >
                Apache Cordova
              </Label>{' '}
              guides for push.
            </Text>
          );
        default:
          return <Text component={TextVariants.small} />;
      }
    };

    const onRefreshed = (variant: Variant) => {
      this.props.variant.secret = variant.secret;
      this.setState({ refreshSecret: false });
    };

    return (
      <>
        <RenewVariantSecret
          visible={!!this.state.refreshSecret}
          app={this.props.app}
          variant={this.props.variant}
          onCancel={() => this.setState({ refreshSecret: false })}
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
              {this.props.variant.variantID}
            </TextListItem>
            <TextListItem component={TextListItemVariants.dt}>
              Variant Secret:
            </TextListItem>
            <TextListItem component={TextListItemVariants.dd}>
              {this.props.variant.secret}
            </TextListItem>

            <TextListItem component={TextListItemVariants.dd}>
              <Button
                className={'button-small'}
                icon={<RedoIcon />}
                variant={ButtonVariant.secondary}
                onClick={() => this.setState({ refreshSecret: true })}
              >
                Renew Variant Secret
              </Button>
            </TextListItem>
          </TextList>

          <AndroidVariantDetails
            app={this.props.app}
            variant={this.props.variant}
          />

          <IOSTokenVariantDetails
            app={this.props.app}
            variant={this.props.variant}
          />

          <IOSCertVariantDetails
            app={this.props.app}
            variant={this.props.variant}
          />
        </TextContent>
        <AndroidCodeSnippets
          app={this.props.app}
          variant={this.props.variant}
        />
        <IOSTokenCodeSnippets
          app={this.props.app}
          variant={this.props.variant}
        />
        <IOSCertCodeSnippets
          app={this.props.app}
          variant={this.props.variant}
        />
      </>
    );
  };
}
