import React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { PageHeader } from '@patternfly/react-core';

// tslint:disable-next-line:variable-name
export const Header = () => {
  return (
    <PageHeader
      logoProps={{ href: 'https://aerogear.org' }}
      logo={
        <>
          <strong>AEROGEAR</strong>&nbsp; UNIFIEDPUSH SERVER
        </>
      }
      showNavToggle={false}
      isNavOpen={true}
    />
  );
};
