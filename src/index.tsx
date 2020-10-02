import React from 'react';
import ReactDOM from 'react-dom';
// Ignoring, this file is create at build time
// eslint-disable-next-line node/no-unpublished-import
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
