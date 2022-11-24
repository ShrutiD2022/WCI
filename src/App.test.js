import React from 'react';
import { render } from '@testing-library/react';
import Testing from './Components/Testing';


test('render', () => {
  const { getByText } = render(<Testing/>);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});



