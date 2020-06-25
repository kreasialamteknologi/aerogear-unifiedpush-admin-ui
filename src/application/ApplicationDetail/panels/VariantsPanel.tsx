import {
  PushApplication,
  Variant,
  VARIANT_TYPE,
} from '@aerogear/unifiedpush-admin-client';
import React, { Component } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderMain,
  List,
  ListItem,
  ListVariant,
  Text,
  TextVariants,
  DataList,
} from '@patternfly/react-core';
import { VariantItem } from './VariantItem';

export interface Props {
  app?: PushApplication;
  variantType: VARIANT_TYPE;
}

export abstract class VariantsPanel extends Component<Props> {
  private getVariants(): Variant[] {
    if (this.props.app?.variants && this.props.app?.variants.length > 0) {
      return this.props.app.variants.filter(
        (variant: Variant) => variant.type === this.props.variantType
      );
    }

    return [];
  }

  render = () => {
    const getIcon = () => {
      switch (this.props.variantType) {
        case 'android':
          return 'fab fa-android fa-3x muted';
        case 'ios':
          return '';
        case 'ios_token':
          return '';
        case 'web_push':
          return '';
        default:
          return '';
      }
    };

    const variants = this.getVariants();

    if (variants.length > 0) {
      return (
        <Card className={'variant-details'}>
          <CardHeader className={'header'}>
            <CardHeaderMain className={'content'}>
              <i className={getIcon()} />
              <Text component={TextVariants.h3} className={'title'}>
                Variants
              </Text>
              <List
                variant={ListVariant.inline}
                style={{ paddingLeft: 15, color: '#999', fontSize: 13 }}
              >
                <ListItem>
                  <i className={`fas fa-mobile-alt`} />{' '}
                </ListItem>
                <ListItem>
                  <Text style={{ fontWeight: 700 }}>
                    {this.props.app?.deviceCount || 0}
                  </Text>
                </ListItem>
                <ListItem>Devices</ListItem>
              </List>
            </CardHeaderMain>
          </CardHeader>
          <CardBody>
            <DataList aria-label="Expandable data list example">
              {this.props.app?.variants?.map(variant => (
                <VariantItem variant={variant} app={this.props.app!} />
              ))}
            </DataList>
          </CardBody>
        </Card>
      );
    } else {
      return null;
    }
  };
}
