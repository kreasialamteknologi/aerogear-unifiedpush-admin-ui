import React, { Component } from 'react';
import { PushApplication } from '@aerogear/unifiedpush-admin-client';
import {
  Button,
  DataListCell,
  DataListItem,
  DataListItemCells,
  DataListItemRow,
  List,
  ListItem,
  ListVariant,
} from '@patternfly/react-core';
import { Label } from '../../common/Label';
import {
  EditIcon,
  MessagesIcon,
  TrashIcon,
  UserIcon,
} from '@patternfly/react-icons';

interface Props {
  app: PushApplication;
  onEdit?: (app: PushApplication) => void;
  onDelete?: (app: PushApplication) => void;
}

export class ApplicationListItem extends Component<Props> {
  render = () => (
    <DataListItem
      aria-labelledby={'item'}
      key={this.props.app.pushApplicationID}
      className="appList"
    >
      <DataListItemRow>
        <DataListItemCells
          dataListCells={[
            <DataListCell isIcon key="icon">
              <div className={'app-icon'}>{this.props.app.name.charAt(0)}</div>
            </DataListCell>,
            <DataListCell key="primary content">
              <div className="title">{this.props.app.name}</div>
              <div className="subtitle">
                <List variant={ListVariant.inline}>
                  <ListItem className="subtitle">
                    <Label
                      text={`created by admin ${this.props.app.developer}`}
                      icon={<UserIcon />}
                    />
                  </ListItem>
                  <ListItem className="subtitle">
                    <Label
                      text={`${
                        this.props.app.variants
                          ? this.props.app.variants.length
                          : 0
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
                      this.props.onEdit && this.props.onEdit(this.props.app)
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
                      this.props.onDelete && this.props.onDelete(this.props.app)
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
}
