import React, { ReactNode } from 'react';
import { PlusCircleIcon } from '@patternfly/react-icons';
import { Component } from 'react';
import { PushApplication } from '@aerogear/unifiedpush-admin-client';
import {
  DataList,
  Title,
  Split,
  SplitItem,
  Button,
  Pagination,
  PaginationVariant,
} from '@patternfly/react-core';
import { CreateApplicationWizard } from '../wizard/CreateApplicationWizard';
import {
  ApplicationListConsumer,
  ContextInterface,
} from '../../context/Context';
import { DeleteApplicationPage } from '../crud/DeleteApplicationPage';
import { UpdateApplicationPage } from '../crud/UpdateApplicationPage';
import { ApplicationListItem } from './ApplicationListItem';

interface Props {
  apps: PushApplication[];
}

interface State {
  openCreateAppWizard: boolean;
  deleteApplicationPage: boolean;
  updateApplicationPage: boolean;
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
                  <Title
                    headingLevel="h1"
                    size="3xl"
                    style={{
                      paddingTop: 40,
                      paddingLeft: 25,
                      paddingBottom: 20,
                    }}
                  >
                    Applications
                  </Title>
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
                {applications.map(app => (
                  <ApplicationListItem
                    app={app}
                    onEdit={editApp}
                    onDelete={deleteApp}
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
