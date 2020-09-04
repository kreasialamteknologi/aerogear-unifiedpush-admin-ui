import React, { Component, useContext, useState } from 'react';
import {
  AndroidVariant,
  Variant,
  PushApplication,
} from '@aerogear/unifiedpush-admin-client';
import {
  DataListCell,
  DataListContent,
  DataListItem,
  DataListItemCells,
  DataListItemRow,
  DataListToggle,
  Text,
  TextVariants,
  Button,
  ListVariant,
  List,
  ListItem,
} from '@patternfly/react-core';
import { VariantDetails } from './VariantDetails';
import { EditIcon, TrashIcon } from '@patternfly/react-icons';
import { DeleteVariantPage } from '../../crud/DeleteVariantPage';
import { RenameVariantPage } from '../../crud/RenameVariantPage';
import {
  ApplicationListContext,
  ContextInterface,
} from '../../../context/Context';

interface Props {
  app: PushApplication;
  variant: Variant;
}

interface State {
  expanded: boolean;
  deleteVariantPage: boolean;
  editVariantPage: boolean;
  selectedVariant?: Variant;
}

export function VariantItem(props: Props) {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [deleteVariant, openDeleteVariant] = useState<boolean>(false);
  const [editVariant, openEditVariant] = useState<boolean>(false);

  const context = useContext<ContextInterface>(ApplicationListContext);

  return (
    <>
      <DataListItem
        className="varList"
        aria-labelledby={'cell-' + props.variant.id}
        isExpanded={expanded}
      >
        <DataListItemRow>
          <DataListToggle
            onClick={() => setExpanded(!expanded)}
            isExpanded={expanded}
            id={'toggle-' + props.variant.id}
            aria-controls={'expand-' + props.variant.id}
          />
          <DataListItemCells
            dataListCells={[
              <DataListCell key="primary content">
                <div id={'cell-' + props.variant.id}>
                  {props.variant.name}
                  <Text
                    style={{ paddingLeft: 20, color: '#999' }}
                    component={TextVariants.small}
                  >
                    <i style={{ paddingRight: 5 }} className="fas fa-ban" />
                    {!props.variant.metadata?.deviceCount
                      ? 'No installation yet'
                      : `${props.variant.metadata?.deviceCount} Device${
                          props.variant.metadata?.deviceCount > 1 ? 's' : ''
                        }`}
                  </Text>
                </div>
              </DataListCell>,
              <DataListCell key="buttons">
                <List className="varBtnGroup" variant={ListVariant.inline}>
                  <ListItem>
                    <Button
                      className="editBtn"
                      variant="secondary"
                      icon={<EditIcon />}
                      onClick={async () => {
                        await context.selectVariant(props.variant);
                        openEditVariant(true);
                      }}
                    />
                  </ListItem>
                  <ListItem>
                    <Button
                      className="deleteBtn"
                      variant="danger"
                      icon={<TrashIcon />}
                      onClick={async () => {
                        await context.selectVariant(props.variant);
                        openDeleteVariant(true);
                      }}
                    />
                  </ListItem>
                </List>
              </DataListCell>,
            ]}
          />
        </DataListItemRow>
        <DataListContent
          aria-label="Primary Content Details"
          id={'expand-' + props.variant.id}
          isHidden={!expanded}
        >
          <VariantDetails
            variant={props.variant as AndroidVariant}
            app={props.app}
          />
        </DataListContent>
      </DataListItem>
      <DeleteVariantPage
        open={deleteVariant}
        close={() => openDeleteVariant(false)}
        app={props.app}
      />
      <RenameVariantPage
        open={editVariant}
        close={() => openEditVariant(false)}
        app={props.app}
      />
    </>
  );
}

export class VariantItem2 extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      expanded: false,
      deleteVariantPage: false,
      editVariantPage: false,
    };
  }

  render = () => {
    const toggle = () => {
      this.setState({ expanded: !this.state.expanded });
    };
    const context = this.context as ContextInterface;
    return (
      <>
        <DataListItem
          className="varList"
          aria-labelledby={'cell-' + this.props.variant.id}
          isExpanded={this.state.expanded}
        >
          <DataListItemRow>
            <DataListToggle
              onClick={() => toggle()}
              isExpanded={this.state.expanded}
              id={'toggle-' + this.props.variant.id}
              aria-controls={'expand-' + this.props.variant.id}
            />
            <DataListItemCells
              dataListCells={[
                <DataListCell key="primary content">
                  <div id={'cell-' + this.props.variant.id}>
                    {this.props.variant.name}
                    <Text
                      style={{ paddingLeft: 20, color: '#999' }}
                      component={TextVariants.small}
                    >
                      <i style={{ paddingRight: 5 }} className="fas fa-ban" />
                      No installation yet
                    </Text>
                  </div>
                </DataListCell>,
                <DataListCell key="buttons">
                  <List className="varBtnGroup" variant={ListVariant.inline}>
                    <ListItem>
                      <Button
                        className="editBtn"
                        variant="secondary"
                        icon={<EditIcon />}
                        onClick={async () => {
                          await context.selectVariant(this.props.variant);
                          this.setState({ editVariantPage: true });
                        }}
                      />
                    </ListItem>
                    <ListItem>
                      <Button
                        className="deleteBtn"
                        variant="danger"
                        icon={<TrashIcon />}
                        onClick={async () => {
                          await context.selectVariant(this.props.variant);
                          this.setState({ deleteVariantPage: true });
                        }}
                      />
                    </ListItem>
                  </List>
                </DataListCell>,
              ]}
            />
          </DataListItemRow>
          <DataListContent
            aria-label="Primary Content Details"
            id={'expand-' + this.props.variant.id}
            isHidden={!this.state.expanded}
          >
            <VariantDetails
              variant={this.props.variant as AndroidVariant}
              app={this.props.app}
            />
          </DataListContent>
        </DataListItem>
        <DeleteVariantPage
          open={this.state.deleteVariantPage}
          close={() => this.setState({ deleteVariantPage: false })}
          app={this.props.app}
        />
        <RenameVariantPage
          open={this.state.editVariantPage}
          close={() => this.setState({ editVariantPage: false })}
          app={this.props.app}
        />
      </>
    );
  };
}
VariantItem.contextType = ApplicationListContext;
