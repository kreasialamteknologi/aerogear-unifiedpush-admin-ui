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
import { DialogModal } from '../common/Modal';
import { DeleteApplicationPage } from '../application/wizard/DeleteApplicationPage';

interface Props {
  apps: PushApplication[];
}

interface State {
  openCreateAppWizard: boolean;
  dialogModal: boolean;
  selectedApp?: PushApplication;
}

export class ApplicationList extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      openCreateAppWizard: false,
      dialogModal: false,
    };
  }

  render() {
    const dataListItem = (app: PushApplication): ReactNode => (
      <DataListItem aria-labelledby={'item'} key={app.pushApplicationID}>
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
                          this.setState({ dialogModal: true, selectedApp: app })
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
                          this.setState({ dialogModal: true, selectedApp: app })
                        }
                      >
                        <TrashIcon />
                      </Button>
                    </ListItem>
                  </List>
                </div>
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
              <DialogModal
                open={this.state.dialogModal}
                close={() => {
                  this.setState({ dialogModal: false });
                }}
              >
                <DeleteApplicationPage
                  app={this.state.selectedApp}
                  close={() => {
                    this.setState({ dialogModal: false });
                    refresh();
                  }}
                />
              </DialogModal>
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
        }}
      </ApplicationListConsumer>
    );
  }
}
