import React from 'react';
import { createRoot } from 'react-dom/client';
import { MsgProvider, getConnection } from '../../common/msg/MsgProvider';
import Newtab from './Newtab';
import './index.css';
const connection = getConnection('newtab')

document.addEventListener('DOMContentLoaded', () => {

  const container = document.getElementById('app-container');
  const root = createRoot(container); // createRoot(container!) if you use TypeScript
  root.render(
    <MsgProvider connection={connection}>
      <Newtab />
    </MsgProvider>

  );
});

