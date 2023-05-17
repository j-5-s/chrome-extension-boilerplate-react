import React from 'react';
import { render, screen } from '@testing-library/react';
import Newtab from '../Newtab';
import { MsgProvider } from '../../../common/msg/MsgProvider';

test('renders hello world', () => {
  const connection = {
    postMessage: jest.fn(),
    onMessage: {
      addListener: jest.fn(),
      removeListener: jest.fn(),
      postMessage: jest.fn(),
    },
  };
  render(
    <MsgProvider connection={connection}>
      <Newtab />
    </MsgProvider>
  );
  const linkElement = screen.getByText(/hello world/i);
  expect(linkElement).toBeInTheDocument();
});
