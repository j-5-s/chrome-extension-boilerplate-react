import { wrapStore } from 'webext-redux';

import { setupStore } from '../../common/store';
import throttle from 'lodash/throttle';
import omit from 'lodash/omit';

chrome.storage.local.get(['state'], ({ state }) => {
  const store = setupStore(state);
  wrapStore(store);

  /**
   * Save the current store state to local storage
   */
  const saveState = () => {
    if (!store) {
      return;
    }

    console.info('Saving state to chrome.storage.local');

    const state = store.getState();

    chrome.storage.local.set({
      // remove bookmark folders from taking up unnecessary space
      state: omit(state, 'entities'),
    });
  };

  // On new state, persist to local storage
  const throttledSave = throttle(saveState, 10000, {
    trailing: true,
    leading: true,
  });
  store.subscribe(throttledSave);
});
