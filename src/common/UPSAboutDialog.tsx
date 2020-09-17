import brandImg from './logo192.png';
import {
  AboutModal,
  TextContent,
  TextList,
  TextListItem,
} from '@patternfly/react-core';
import packageJson from '../../package.json';
import { UpsClientFactory } from '../utils/UpsClientFactory';
import {
  browserName,
  engineName,
  engineVersion,
  fullBrowserVersion,
  osName,
  osVersion,
} from 'react-device-detect';
import React from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function UPSAboutDialog(props: Props) {
  return (
    <AboutModal
      isOpen={props.isOpen}
      onClose={props.onClose}
      trademark="Copyright © 2020 the AeroGear team"
      brandImageSrc={brandImg}
      brandImageAlt="Aerogear UPS logo"
      productName="Aerogear Unified Push Server"
    >
      <TextContent>
        <TextList component="dl">
          <TextListItem component="dt">AdminUI Version</TextListItem>
          <TextListItem component="dd">{packageJson.version}</TextListItem>
          <TextListItem component="dt">Server URL</TextListItem>
          <TextListItem component="dd">
            {UpsClientFactory.getUPSServerURL()}
          </TextListItem>
          <TextListItem component="dt">User Name</TextListItem>
          <TextListItem component="dd">admin</TextListItem>
          <TextListItem component="dt">Browser</TextListItem>
          <TextListItem component="dd">{`${browserName} ${fullBrowserVersion}`}</TextListItem>
          <TextListItem component="dt">Browser OS</TextListItem>
          <TextListItem component="dd">{`${osName} ${osVersion}`}</TextListItem>
          <TextListItem component="dt">Engine</TextListItem>
          <TextListItem component="dd">{`${engineName} ${engineVersion}`}</TextListItem>
        </TextList>
      </TextContent>
    </AboutModal>
  );
}
