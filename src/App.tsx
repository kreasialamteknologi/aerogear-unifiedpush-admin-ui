import React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.css';

import { Welcome } from './landing/Welcome';

function App() {
  return (
    <Welcome />
  );
}

// tslint:disable-next-line:no-default-export
export default App;
