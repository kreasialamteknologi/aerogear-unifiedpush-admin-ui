import React, { useEffect, useState } from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { QuestionCircleIcon } from '@patternfly/react-icons';

import { PageHeader, PageHeaderTools } from '@patternfly/react-core';
import { UserTool } from './UserTool';
import { Config, UpsConfig } from '../utils/Config';
import { UPSAboutDialog } from './UPSAboutDialog';
import { getLink as _getLink } from '../utils/DocLinksUtils';

export function Header() {
  const [isAboutDialogOpen, openAboutDialog] = useState<boolean>(false);
  const [docLinks, setDocLinks] = useState<UpsConfig | undefined>(undefined);

  useEffect(() => {
    (async () => setDocLinks(await Config.getInstance().getDocsConfig()))();
  });

  const getLink = (key: string) => _getLink(docLinks, key);

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
