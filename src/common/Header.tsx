import React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { PageHeader } from '@patternfly/react-core';

import '../App.css';

// tslint:disable-next-line:variable-name
export const Header = () => {
  return (
    <PageHeader
      logo={
        <a className="navbar-brand" href="https://aerogear.org">
          <strong>AEROGEAR</strong> UNIFIEDPUSH SERVER
        </a>
      }
      showNavToggle={false}
      isNavOpen={true}
    />
  );
};
