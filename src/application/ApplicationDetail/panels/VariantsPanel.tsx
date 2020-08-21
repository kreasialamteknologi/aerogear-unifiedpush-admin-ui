import {
  PushApplication,
  Variant,
  VariantType,
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
  variantType: VariantType;
}

export abstract class VariantsPanel extends Component<Props> {
  private getVariants(): Variant[] {
    if (this.props.app?.variants && this.props.app?.variants.length > 0) {
      const res = this.props.app.variants.filter(
        (variant: Variant) => variant.type === this.props.variantType
      );
      return res;
    }

    return [];
  }

  render = () => {
    const getIcon = () => {
      switch (this.props.variantType) {
        case 'android':
          return 'fab fa-android fa-3x muted';
        case 'ios':
        case 'ios_token':
          return 'fab fa-apple fa-3x muted';
        case 'web_push':
          return 'fab fa-chrome fa-3x muted';
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
                    {this.props.app?.variants
                      ?.filter(
                        variant => variant.type === this.props.variantType
                      )
                      .map(variant => variant.metadata?.deviceCount || 0)
                      .reduce(
                        (currentTotal: number, currentValue: number) =>
                          currentTotal + currentValue,
                        0
                      )}
                  </Text>
                </ListItem>
                <ListItem>Devices</ListItem>
              </List>
            </CardHeaderMain>
          </CardHeader>
          <CardBody>
            <DataList aria-label="Expandable data list example">
              {variants?.map(variant => (
                <VariantItem
                  key={`${variant.variantID}#item`}
                  variant={variant}
                  app={this.props.app!}
                />
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
