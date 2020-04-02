import React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.css';

import {
  Page,
  } from '@patternfly/react-core';
import { Welcome } from './landing/Welcome';
import Header from './common/Header';

function App() {
  return (
    <Page header={<Header />}>
    <Welcome />
  </Page>
  );
}

// tslint:disable-next-line:no-default-export
export default App;
