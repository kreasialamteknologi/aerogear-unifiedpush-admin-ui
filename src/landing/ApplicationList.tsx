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
} from '@patternfly/react-core';
import { TrashIcon, EditIcon } from '@patternfly/react-icons';
import { Label } from '../common/Label';
import { CreateApplicationWizard } from '../application/wizard/CreateApplicationWizard';
import { ApplicationListConsumer } from '../context/Context';
import { DeleteApplicationPage } from '../application/crud/DeleteApplicationPage';
import { UpdateApplicationPage } from '../application/crud/UpdateApplicationPage';

interface Props {
  apps: PushApplication[];
}

interface State {
  openCreateAppWizard: boolean;
  deleteApplicationPage: boolean;
  updateApplicationPage: boolean;
  selectedApp?: PushApplication;
}

export class ApplicationList extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      openCreateAppWizard: false,
      deleteApplicationPage: false,
      updateApplicationPage: false,
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
                    <ListItem>
                      <Button
                        variant="secondary"
                        icon={<EditIcon />}
                        onClick={() =>
                          this.setState({ updateApplicationPage: true, selectedApp: app })
                        }
                      >
                        <EditIcon />
                      </Button>
                    </ListItem>
                    <ListItem>
                      <Button
                        variant="danger"
                        icon={TrashIcon}
                        onClick={() =>
                          this.setState({ deleteApplicationPage: true, selectedApp: app })
                        }
                      >
                        <TrashIcon />
                      </Button>
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
                      // isHover={false}
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
        {({ applications, refresh }): ReactNode => {
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
              <DataList aria-label="Expandable data list example">
                {applications.map(app => dataListItem(app))}
              </DataList>
            </>
          );
        }
        }
      </ApplicationListConsumer >
    );
  }
}
