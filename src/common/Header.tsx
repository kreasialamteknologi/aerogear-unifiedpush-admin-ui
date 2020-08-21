import React, {Component} from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { QuestionCircleIcon } from '@patternfly/react-icons';
import brandImg from './logo192.png';

import {AboutModal, PageHeader, PageHeaderTools, TextContent, TextList, TextListItem} from '@patternfly/react-core';
import {UpsClientFactory} from "../utils/UpsClientFactory";
import {fullBrowserVersion, browserName, osName, osVersion, engineName, engineVersion} from 'react-device-detect';
import packageJson from '../../package.json';

interface State {
    aboutDialogOpen : boolean;
}

// tslint:disable-next-line:variable-name
export class Header extends Component<{ }, State>
{
    constructor(props: {}) {
        super(props);
        this.state = {
            aboutDialogOpen: false
        };
    }

    readonly render = () => {
        const handleModalToggle = () => this.setState({aboutDialogOpen: false});

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
                        <TextListItem component="dd">{UpsClientFactory.getUPSServerURL()}</TextListItem>
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
                logoProps={{href: 'https://aerogear.org'}}
                logo={
                    <>
                        <strong>AEROGEAR</strong>&nbsp; UNIFIEDPUSH SERVER
                    </>
                }
                showNavToggle={false}
                isNavOpen={true}
                headerTools={<PageHeaderTools><QuestionCircleIcon style={{cursor: 'pointer'}}
                                                                  onClick={() => this.setState({aboutDialogOpen: true})}/></PageHeaderTools>}
            />
        </>
    );
}
};
