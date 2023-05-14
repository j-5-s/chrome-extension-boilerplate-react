import React from 'react';
import { createRoot } from 'react-dom/client';
import { createWebExtStore } from '../../common/store/webext-store'
import {Provider} from 'react-redux';
import Popup from './Popup';
import './index.css';

const store = createWebExtStore();

// wait for the store to connect to the background page
store.ready().then(() => {

  const container = document.getElementById('app-container');
  const root = createRoot(container); // createRoot(container!) if you use TypeScript
  root.render(
    <Provider store={store}>
      <Popup />
    </Provider>
  );

});