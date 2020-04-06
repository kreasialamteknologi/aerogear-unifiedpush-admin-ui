import React from 'react';
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
import { Label } from '../common/Label';

interface Props {
  apps: PushApplication[];
}

export class ApplicationList extends Component<Props> {
  render() {
    return (
      <>
        <Split>
          <SplitItem>
            <Title
              headingLevel="h1"
              size="3xl"
              style={{ paddingTop: 40, paddingLeft: 25, paddingBottom: 20 }}
            >
              Applications
            </Title>
          </SplitItem>
          <SplitItem isFilled />
          <SplitItem>
            <Button
              variant="link"
              icon={<PlusCircleIcon />}
              style={{ paddingTop: 50, paddingLeft: 25, paddingBottom: 20 }}
            >
              Create Application
            </Button>
          </SplitItem>
        </Split>
        <DataList aria-label="Expandable data list example">
          {this.props.apps.map(app => (
            <DataListItem aria-labelledby={'item'}>
              <DataListItemRow>
                <DataListItemCells
                  dataListCells={[
                    <DataListCell isIcon key="icon">
                      <div className={'app-icon'}>A</div>
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
                            <Label
                              text={'0 messages sent'}
                              icon={<MessagesIcon />}
                            />
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
                  ]}
                />
              </DataListItemRow>
            </DataListItem>
          ))}
        </DataList>
      </>
    );
  }
}
