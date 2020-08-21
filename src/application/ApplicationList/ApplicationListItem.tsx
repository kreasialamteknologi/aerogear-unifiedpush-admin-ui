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
  TextVariants,
  Text,
} from '@patternfly/react-core';
import { Label } from '../../common/Label';
import {
  EditIcon,
  MessagesIcon,
  MobileAltIcon,
  TrashIcon,
  UserIcon,
} from '@patternfly/react-icons';
import { Link } from 'react-router-dom';

interface Props {
  app: PushApplication;
  onEdit?: (app: PushApplication) => void;
  onDelete?: (app: PushApplication) => void;
  onClick?: (app: PushApplication) => void;
}

export class ApplicationListItem extends Component<Props> {
  render = () => (
    <Link to={`/app/${this.props.app.pushApplicationID}`}>
      <DataListItem
        aria-labelledby={'item'}
        key={this.props.app.pushApplicationID}
        className="appList"
      >
        <DataListItemRow>
          <DataListItemCells
            dataListCells={[
              <DataListCell isIcon key="icon" width={1}>
                <div className={'app-icon'}>
                  {this.props.app.name.charAt(0)}
                </div>
              </DataListCell>,
              <DataListCell key="primary content" width={5}>
                <Text component={TextVariants.h2}>{this.props.app.name}</Text>
                <List variant={ListVariant.inline} className={'subtitle'}>
                  <ListItem>
                    <Label
                      text={`created by ${this.props.app.developer}`}
                      icon={<UserIcon />}
                    />
                  </ListItem>
                  <ListItem>
                    <Label
                      text={`${
                        this.props.app.variants
                          ? this.props.app.variants.length
                          : 0
                      } variants`}
                      icon={'fa fa-code-branch'}
                    />
                  </ListItem>
                  <ListItem>
                    <Label
                      text={`${this.props.app.metadata?.activity ||
                        0} messages sent`}
                      icon={<MessagesIcon />}
                    />
                  </ListItem>
                  <ListItem>
                    <Label
                      text={`${this.props.app.metadata?.deviceCount ||
                        0} device${
                        this.props.app.metadata?.deviceCount === 1 ? '' : 's'
                      } registered`}
                      icon={<MobileAltIcon />}
                    />
                  </ListItem>
                </List>
              </DataListCell>,
              <DataListCell key="buttons">
                <List className="buttonGroup" variant={ListVariant.inline}>
                  <ListItem>
                    <Button
                      className="editBtn"
                      variant="secondary"
                      icon={<EditIcon />}
                      onClick={evt => {
                        evt.preventDefault();
                        evt.stopPropagation();
                        return (
                          this.props.onEdit && this.props.onEdit(this.props.app)
                        );
                      }}
                    />
                  </ListItem>
                  <ListItem>
                    <Button
                      className="deleteBtn"
                      variant="danger"
                      icon={<TrashIcon />}
                      onClick={evt => {
                        evt.preventDefault();
                        evt.stopPropagation();
                        return (
                          this.props.onDelete &&
                          this.props.onDelete(this.props.app)
                        );
                      }}
                    />
                  </ListItem>
                </List>
              </DataListCell>,
            ]}
          />
        </DataListItemRow>
      </DataListItem>
    </Link>
  );
}
