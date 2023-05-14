
import {Store} from 'webext-redux';

export const createWebExtStore = () => {
  const store = new Store();
  Object.assign(store, {
    dispatch: store.dispatch.bind(store),
    getState: store.getState.bind(store),
    subscribe: store.subscribe.bind(store),
  });

  return store;
}