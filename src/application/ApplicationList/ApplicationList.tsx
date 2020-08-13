import React, { ReactNode } from 'react';
import { PlusCircleIcon } from '@patternfly/react-icons';
import { Component } from 'react';
import { PushApplication } from '@aerogear/unifiedpush-admin-client';
import {
  DataList,
  Text,
  Split,
  SplitItem,
  Button,
  Pagination,
  PaginationVariant,
  TextVariants,
} from '@patternfly/react-core';
import { CreateApplicationWizard } from '../wizard/CreateApplicationWizard';
import {
  ApplicationListConsumer,
  ContextInterface,
} from '../../context/Context';
import { DeleteApplicationPage } from '../crud/DeleteApplicationPage';
import { UpdateApplicationPage } from '../crud/UpdateApplicationPage';
import { ApplicationListItem } from './ApplicationListItem';
import { ApplicationDetail } from '../ApplicationDetail/ApplicationDetail';

interface Props {
  apps: PushApplication[];
}

interface State {
  openCreateAppWizard: boolean;
  deleteApplicationPage: boolean;
  updateApplicationPage: boolean;
  showAppDetailPage: boolean;
  selectedApp?: PushApplication;
  currentPage: number;
  totalApps: number;
}

export class ApplicationList extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      openCreateAppWizard: false,
      deleteApplicationPage: false,
      updateApplicationPage: false,
      showAppDetailPage: false,
      currentPage: 0,
      totalApps: 0,
    };
  }

  render() {
    const editApp = (app: PushApplication) =>
      this.setState({
        updateApplicationPage: true,
        selectedApp: app,
      });

    const deleteApp = (app: PushApplication) =>
      this.setState({
        deleteApplicationPage: true,
        selectedApp: app,
      });

    const showAppDetails = (app: PushApplication) =>
      this.setState({
        showAppDetailPage: true,
        selectedApp: app,
      });

    const closeAllDialogs = () =>
      this.setState({
        showAppDetailPage: false,
        deleteApplicationPage: false,
        updateApplicationPage: false,
      });

    return (
      <ApplicationListConsumer>
        {({ applications, refresh, total }: ContextInterface): ReactNode => {
          return (
            <>
              <UpdateApplicationPage
                open={this.state.updateApplicationPage}
                app={this.state.selectedApp}
                close={() => {
                  this.setState({ updateApplicationPage: false });
                  refresh();
                }}
              />
              <DeleteApplicationPage
                open={this.state.deleteApplicationPage}
                app={this.state.selectedApp}
                close={() => {
                  this.setState({ deleteApplicationPage: false });
                  refresh();
                }}
              />
              <CreateApplicationWizard
                open={this.state.openCreateAppWizard}
                close={() => {
                  this.setState({ openCreateAppWizard: false });
                  refresh();
                }}
              />
              <Split>
                <SplitItem>
                  <Text
                    component={TextVariants.h1}
                    style={{
                      paddingTop: 40,
                      paddingLeft: 25,
                      paddingBottom: 20,
                    }}
                  >
                    Applications
                  </Text>
                </SplitItem>
                <SplitItem isFilled />
                <SplitItem>
                  <Button
                    variant="link"
                    icon={<PlusCircleIcon />}
                    style={{
                      paddingTop: 50,
                      paddingLeft: 25,
                      paddingBottom: 20,
                    }}
                    onClick={() => this.setState({ openCreateAppWizard: true })}
                  >
                    Create Application
                  </Button>
                </SplitItem>
              </Split>
              <DataList aria-label="Data list for Push Applications on the Server">
                {applications.map((app: PushApplication) => (
                  <ApplicationListItem
                    app={app}
                    onEdit={editApp}
                    onDelete={deleteApp}
                    onClick={showAppDetails}
                    key={`${app.pushApplicationID}#item`}
                  />
                ))}
              </DataList>
              <Pagination
                itemCount={total}
                widgetId="pagination-options-menu-bottom"
                page={this.state.currentPage}
                variant={PaginationVariant.bottom}
                onNextClick={(_event, currentPage) => {
                  this.setState({ currentPage });
                  console.log(currentPage);
                  refresh(currentPage - 1);
                }}
                onPreviousClick={(_event, currentPage) => {
                  this.setState({ currentPage });
                  refresh(currentPage - 1);
                  console.log(currentPage);
                }}
              />
            </>
          );
        }}
      </ApplicationListConsumer>
    );
  }
}
