import React from 'react';
import { createRoot } from 'react-dom/client';
import { MsgProvider } from '../../common/msg/MsgProvider';
import Popup from './Popup';
import './index.css';
import { getConnection } from '../../common/msg/MsgProvider';

const connection = getConnection('popup');
// wait for the store to connect to the background page
document.addEventListener('DOMContentLoaded', () => {

  const container = document.getElementById('app-container');
  const root = createRoot(container); // createRoot(container!) if you use TypeScript
  root.render(
    <MsgProvider connection={connection}>
      <Popup />
    </MsgProvider>
  );
});
