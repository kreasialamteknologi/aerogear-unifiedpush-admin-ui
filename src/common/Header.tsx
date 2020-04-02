import React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import '@fortawesome/fontawesome-free/css/all.css';


import {
    PageHeader,
  } from '@patternfly/react-core';
  

import '../App.css';

function Header() {

    const header = (
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

  return (
    header
  );
}

// tslint:disable-next-line:no-default-export
export default Header;
