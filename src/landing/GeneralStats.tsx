import {PushApplication} from '@aerogear/unifiedpush-admin-client';
import React, {Component} from 'react';
import {Divider, List, ListItem, ListVariant, Text, TextVariants, Title,} from '@patternfly/react-core';

interface Props {
  apps: PushApplication[];
}

export class GeneralStats extends Component<Props> {
  render() {
    return (
      <div className={'apps-dashboard'}>
        <Title
          headingLevel="h1"
          size="xs"
          style={{ paddingTop: 51, paddingLeft: 20, paddingBottom: 21 }}
        >
          General Statistics
        </Title>
        <Divider />
        <List variant={ListVariant.inline} style={{marginLeft: 20, marginTop: 20}}>
          <ListItem><div><Text className={'ups-count'}>2</Text><Text style={{fontSize: 15, color: '#999'}}>Apps</Text></div></ListItem>
          <ListItem><div><Text style={{fontSize: 30, color: '#999'}}>0</Text><Text style={{fontSize: 15, color: '#999'}}>Messages</Text></div></ListItem>
          <ListItem><div><Text style={{fontSize: 30, color: '#999'}}>0</Text><Text style={{fontSize: 15, color: '#999'}}>Devices</Text></div></ListItem>
        </List>
      </div>
    );
  }
}
