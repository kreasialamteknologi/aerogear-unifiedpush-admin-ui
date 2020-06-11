import React, { ReactNode } from 'react';
import {
  UserIcon,
  MessagesIcon,
  PlusCircleIcon,
} from '@patternfly/react-icons';
import { Component } from 'react';
import { PushApplication } from '@aerogear/unifiedpush-admin-client';
import {
  DataList,
  DataListCell,
  DataListItemCells,
  DataListItemRow,
  List,
  ListItem,
  ListVariant,
  Title,
  Split,
  SplitItem,
  Button,
  DataListItem,
  Pagination,
  PaginationVariant,
  getNextIndex,
} from '@patternfly/react-core';
import { TrashIcon, EditIcon } from '@patternfly/react-icons';
import { Label } from '../common/Label';
import { CreateApplicationWizard } from './wizard/CreateApplicationWizard';
import { ApplicationListConsumer } from '../context/Context';
import { DeleteApplicationPage } from './crud/DeleteApplicationPage';
import { UpdateApplicationPage } from './crud/UpdateApplicationPage';
import { UpsClientFactory } from '../utils/UpsClientFactory';

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
    const dataListItem = (app: PushApplication): ReactNode => (
      <DataListItem
        aria-labelledby={'item'}
        key={app.pushApplicationID}
        className="appList"
      >
        <DataListItemRow>
          <DataListItemCells
            dataListCells={[
              <DataListCell isIcon key="icon">
                <div className={'app-icon'}>{app.name.charAt(0)}</div>
              </DataListCell>,
              <DataListCell key="primary content">
                <div className="title">{app.name}</div>
                <div className="subtitle">
                  <List variant={ListVariant.inline}>
                    <ListItem className="subtitle">
                      <Label
                        text={`created by admin ${app.developer}`}
                        icon={<UserIcon />}
                      />
                    </ListItem>
                    <ListItem className="subtitle">
                      <Label
                        text={`${
                          app.variants ? app.variants.length : 0
                        } variants`}
                        icon={'fa fa-code-branch'}
                      />
                    </ListItem>
                    <ListItem className="subtitle">
                      <Label text={'0 messages sent'} icon={<MessagesIcon />} />
                    </ListItem>
                    <ListItem className="subtitle">
                      <Label
                        text={'0 devices registered'}
                        icon={'fa fa-mobile'}
                      />
                    </ListItem>
                  </List>
                </div>
              </DataListCell>,
              <DataListCell key="buttons">
                <List className="buttonGroup" variant={ListVariant.inline}>
                  <ListItem>
                    <Button
                      className="editBtn"
                      variant="secondary"
                      icon={<EditIcon />}
                      onClick={() =>
                        this.setState({
                          updateApplicationPage: true,
                          selectedApp: app,
                        })
                      }
                    >
                      <EditIcon />
                    </Button>
                  </ListItem>
                  <ListItem>
                    <Button
                      className="deleteBtn"
                      variant="danger"
                      icon={TrashIcon}
                      onClick={() =>
                        this.setState({
                          deleteApplicationPage: true,
                          selectedApp: app,
                        })
                      }
                    >
                      <TrashIcon />
                    </Button>
                  </ListItem>
                </List>
              </DataListCell>,
            ]}
          />
        </DataListItemRow>
      </DataListItem>
    );
    return (
      <ApplicationListConsumer>
        {({ applications, refresh, total }): ReactNode => {
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
                {applications.map(app => dataListItem(app))}
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
