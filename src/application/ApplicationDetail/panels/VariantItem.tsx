import React, { Component } from 'react';
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
} from '@patternfly/react-core';
import { VariantDetails } from './VariantDetails';

interface Props {
  app: PushApplication;
  variant: Variant;
}

interface State {
  expanded: boolean;
}

export class VariantItem extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  render = () => {
    const toggle = () => {
      this.setState({ expanded: !this.state.expanded });
    };
    return (
      <DataListItem aria-labelledby="ex-item1" isExpanded={this.state.expanded}>
        <DataListItemRow>
          <DataListToggle
            onClick={() => toggle()}
            isExpanded={this.state.expanded}
            id="ex-toggle1"
            aria-controls="ex-expand1"
          />
          <DataListItemCells
            dataListCells={[
              <DataListCell key="primary content">
                <div id="ex-item1">
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
            ]}
          />
        </DataListItemRow>
        <DataListContent
          aria-label="Primary Content Details"
          id="ex-expand1"
          isHidden={!this.state.expanded}
        >
          <VariantDetails
            variant={this.props.variant as AndroidVariant}
            app={this.props.app}
          />
        </DataListContent>
      </DataListItem>
    );
  };
}
