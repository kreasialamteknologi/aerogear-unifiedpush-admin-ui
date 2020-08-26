import React, { Component } from 'react';
import { PushApplication, Variant } from '@aerogear/unifiedpush-admin-client';
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
  Split,
  SplitItem,
  ButtonVariant,
  Button,
} from '@patternfly/react-core';
import { VariantsPanel } from './panels/VariantsPanel';
import { SenderAPI } from './SenderAPI';
import { ApplicationStats } from '../../landing/components/ApplicationStats';
import { PlusIcon, ShareIcon } from '@patternfly/react-icons';
import { VariantSelectionForm } from '../VariantForms/VariantSelectionForm';
import { ActivityLogPanel } from './panels/ActivityLogPanel';
import { SendNotifications } from './panels/dialogs/SendNotification';

interface Props {
  app?: PushApplication;
}

interface State {
  activeTab: number;
  addVariantModel: boolean;
  sendNotificationModel: boolean;
}

export class ApplicationDetail extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      activeTab: 0,
      addVariantModel: false,
      sendNotificationModel: false,
    };
  }

  render = () => {
    const onTabSelect = (tabKey: number) => {
      this.setState({ activeTab: tabKey });
    };
    if (!this.props.app) {
      return null;
    }

    if (!this.props.app) {
      return null;
    }

    return (
      <>
        <SendNotifications
          app={this.props.app}
          visible={this.state.sendNotificationModel}
          close={() => this.setState({ sendNotificationModel: false })}
        />
        <VariantSelectionForm
          app={this.props.app}
          open={this.state.addVariantModel}
          close={() => this.setState({ addVariantModel: false })}
          onFinished={(variant?: Variant) => {
            const newVariantList = this.props.app!.variants ?? [];
            newVariantList.push(variant!);
            this.props.app!.variants = newVariantList;
            this.setState({ addVariantModel: false });
          }}
        />
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
              <Split style={{ paddingTop: 20, paddingBottom: 10 }}>
                <SplitItem>
                  <Text component={TextVariants.h1}>
                    {this.props.app!.name}
                  </Text>
                </SplitItem>
                <SplitItem isFilled />
                <SplitItem>
                  <Button
                    className={'button-small'}
                    icon={<ShareIcon />}
                    variant={ButtonVariant.primary}
                    onClick={() =>
                      this.setState({ sendNotificationModel: true })
                    }
                  >
                    Send Notification To This App
                  </Button>
                </SplitItem>
              </Split>

              <Tabs
                activeKey={this.state.activeTab}
                isBox={true}
                onSelect={(evt, key) => onTabSelect(key as number)}
              >
                <Tab eventKey={0} title="Variants">
                  <NoVariantsPanel
                    app={this.props.app}
                    onCreateNew={() => this.setState({ addVariantModel: true })}
                  />
                  {this.props.app?.variants &&
                    this.props.app.variants.length > 0 && (
                      <Split style={{ paddingTop: 20, paddingBottom: 10 }}>
                        <SplitItem>
                          <Text>{`You have ${
                            this.props.app.variants.length
                          } Variant${
                            this.props.app.variants.length === 1 ? '' : 's'
                          }`}</Text>
                        </SplitItem>
                        <SplitItem isFilled />
                        <SplitItem>
                          <Button
                            className={'button-small'}
                            icon={<PlusIcon />}
                            variant={ButtonVariant.primary}
                            onClick={() =>
                              this.setState({ addVariantModel: true })
                            }
                          >
                            Add A Variant
                          </Button>
                        </SplitItem>
                      </Split>
                    )}
                  <VariantsPanel app={this.props.app} variantType="android" />
                  <VariantsPanel app={this.props.app} variantType="ios" />
                  <VariantsPanel app={this.props.app} variantType="ios_token" />
                  <VariantsPanel app={this.props.app} variantType="web_push" />
                </Tab>
                <Tab eventKey={1} title="Sender API">
                  <SenderAPI app={this.props.app!} />
                </Tab>
                <Tab eventKey={2} title="Activity Log">
                  <ActivityLogPanel app={this.props.app!} />
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
      </>
    );
  };
}
