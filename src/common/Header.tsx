import React, { useContext, useState } from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { QuestionCircleIcon } from '@patternfly/react-icons';

import { PageHeader, PageHeaderTools } from '@patternfly/react-core';
import { UserTool } from './UserTool';
import { UPSAboutDialog } from './UPSAboutDialog';
import { getLink as _getLink } from '../utils/DocLinksUtils';
import { ApplicationListContext, ContextInterface } from '../context/Context';

export function Header() {
  const [isAboutDialogOpen, openAboutDialog] = useState<boolean>(false);

  const context = useContext<ContextInterface>(ApplicationListContext);
  const getLink = (key: string) => _getLink(context.upsConfig, key);

  const headerTools = () => (
    <React.Fragment>
      <QuestionCircleIcon
        style={{ cursor: 'pointer' }}
        onClick={() => openAboutDialog(true)}
      />
      <span style={{ width: 15 }} />
      <UserTool />
    </React.Fragment>
  );

  return (
    <>
      <UPSAboutDialog
        isOpen={isAboutDialogOpen}
        onClose={() => openAboutDialog(false)}
      />
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
}
