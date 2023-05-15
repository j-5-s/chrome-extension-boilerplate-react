
import {Store} from 'webext-redux';

export const createWebExtStore = () => new Promise(resolve => {
  const store = new Store();
  Object.assign(store, {
    dispatch: store.dispatch.bind(store),
    getState: store.getState.bind(store),
    subscribe: store.subscribe.bind(store),
  });

  // because data is persisted in chrome.storage.local, we need to wait for
  // from backend. the webext-redux lib does not handle this for us.
  chrome.storage.local.get(['state'], () => {
    store.ready().then(() => {
      resolve(store);
    });
  });
  
});