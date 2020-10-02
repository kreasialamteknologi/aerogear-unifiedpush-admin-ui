import React, { useContext, useState } from 'react';
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
import { InstallationCount } from '../InstallationsCount';

interface Props {
  app: PushApplication;
  variant: Variant;
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
                  <InstallationCount variant={props.variant} app={props.app} />
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
