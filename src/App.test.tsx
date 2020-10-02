import React from 'react';
// testing library is included as dev dependency
// eslint-disable-next-line node/no-unpublished-import
import {render} from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const {getByText} = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
