import React, { Component } from 'react';
import { PushApplication } from '@aerogear/unifiedpush-admin-client';
import { NoVariantsPanel } from './panels/NoVariantsPanel';
import {
  Tabs,
  Tab,
  TextVariants,
  Text,
  Breadcrumb,
  BreadcrumbItem,
  GridItem,
  Grid,
} from '@patternfly/react-core';
import { VariantsPanel } from './panels/VariantsPanel';
import { SenderAPI } from './SenderAPI';
import { ApplicationStats } from '../../landing/components/ApplicationStats';

interface Props {
  app?: PushApplication;
}

interface State {
  activeTab: number;
}

export class ApplicationDetail extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      activeTab: 0,
    };
  }

  render = () => {
    const onTabSelect = (tabKey: number) => {
      this.setState({ activeTab: tabKey });
    };

    if (!this.props.app) {
      return null;
    }

    return (
      <Grid style={{ height: '100%' }}>
        <GridItem sm={8} md={9}>
          <div
            style={{
              paddingLeft: 25,
              paddingRight: 25,
            }}
          >
            <Breadcrumb>
              <BreadcrumbItem to="/">Applications</BreadcrumbItem>
              <BreadcrumbItem to="#" isActive>{`${
                this.props.app!.name
              }: Variants`}</BreadcrumbItem>
            </Breadcrumb>
            <Text
              component={TextVariants.h1}
              style={{
                paddingTop: 40,
                paddingBottom: 20,
              }}
            >
              {this.props.app!.name}
            </Text>
            <Tabs
              activeKey={this.state.activeTab}
              isBox={true}
              onSelect={(evt, key) => onTabSelect(key as number)}
            >
              <Tab eventKey={0} title="Variants">
                <NoVariantsPanel app={this.props.app} />
                {this.props.app?.variants &&
                  this.props.app.variants.length > 0 && (
                    <Text
                      style={{ paddingTop: 20, paddingBottom: 10 }}
                    >{`You have ${this.props.app.variants.length} Variant${
                      this.props.app.variants.length === 1 ? '' : 's'
                    }`}</Text>
                  )}
                <VariantsPanel app={this.props.app} variantType="android" />
                <VariantsPanel app={this.props.app} variantType="ios" />
                <VariantsPanel app={this.props.app} variantType="ios_token" />
                <VariantsPanel app={this.props.app} variantType="web_push" />
              </Tab>
              <Tab eventKey={1} title="Sender API">
                <SenderAPI app={this.props.app!} />
              </Tab>
            </Tabs>
          </div>
        </GridItem>
        <GridItem
          sm={4}
          md={3}
          style={{
            backgroundColor: '#F9F9F9',
            borderLeft: 'solid 1px #C5C5C5',
          }}
        >
          <ApplicationStats app={this.props.app!} />
        </GridItem>
      </Grid>
    );
  };
}
