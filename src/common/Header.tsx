import React, { Component } from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { QuestionCircleIcon } from '@patternfly/react-icons';
import brandImg from './logo192.png';

import {
  AboutModal,
  Dropdown,
  PageHeader,
  PageHeaderTools,
  TextContent,
  TextList,
  TextListItem,
} from '@patternfly/react-core';
import { UpsClientFactory } from '../utils/UpsClientFactory';
import {
  fullBrowserVersion,
  browserName,
  osName,
  osVersion,
  engineName,
  engineVersion,
} from 'react-device-detect';
import packageJson from '../../package.json';
import { UserTool } from './UserTool';
import { Config, UpsConfig } from '../utils/Config';

interface State {
  aboutDialogOpen: boolean;
  docLinks?: UpsConfig;
}

// tslint:disable-next-line:variable-name
export class Header extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      aboutDialogOpen: false,
    };
  }

  async componentDidMount() {
    this.setState({ docLinks: await Config.getInstance().getDocsConfig() });
  }

  readonly render = () => {
    const getLink = (key: string, section = 'DOCS_LINKS') => {
      const docLinks = this.state.docLinks as Record<
        string,
        Record<string, string>
      >;

      return docLinks?.[section]?.[key] || '#';
    };

    const handleModalToggle = () => this.setState({ aboutDialogOpen: false });

    const headerTools = () => (
      <React.Fragment>
        <QuestionCircleIcon
          style={{ cursor: 'pointer' }}
          onClick={() => this.setState({ aboutDialogOpen: true })}
        />
        <span style={{ width: 15 }} />
        <UserTool />
      </React.Fragment>
    );

    return (
      <>
        <AboutModal
          isOpen={this.state.aboutDialogOpen}
          onClose={handleModalToggle}
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
        <PageHeader
          logoProps={{ href: getLink('homepage') }}
          logo={
            <>
              <strong>AEROGEAR</strong>&nbsp; UNIFIEDPUSH SERVER
            </>
          }
          showNavToggle={false}
          isNavOpen={true}
          headerTools={<PageHeaderTools>{headerTools()}</PageHeaderTools>}
        />
      </>
    );
  };
}
