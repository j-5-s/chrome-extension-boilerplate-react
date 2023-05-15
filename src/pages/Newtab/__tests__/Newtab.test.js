import React from 'react';
import { render, screen } from '@testing-library/react';
import Newtab from '../Newtab';
import { renderWithProviders } from '../../../test-utils/reder-with-providers';

test('renders learn react link', () => {
  renderWithProviders(<Newtab />);
  const linkElement = screen.getByText(/hello world/i);
  expect(linkElement).toBeInTheDocument();
});
