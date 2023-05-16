import { ChromeStorageLocal } from './store';
import { Logger } from '../../common/logger/logger';

const konsole = Logger.getInstance();

const ports = new Map();
const store = new ChromeStorageLocal('state');

const publish = (msg) => {
  konsole.log('publish', msg);
  ports.forEach((port, key) => {
    port.postMessage(msg);
  });
};

chrome.runtime.onConnect.addListener(function (port) {
  konsole.log('onConnect', port);
  if (port.sender?.tab?.id) {
    ports.set(port.sender?.tab?.id, port);
  } else {
    ports.set(port.name, port);
  }

  port.onDisconnect.addListener(function (port) {
    konsole.log('onDisconnect', port);
    if (port.sender?.tab?.id) {
      ports.delete(port.sender?.tab?.id);
    } else {
      ports.delete(port.name);
    }
  });

  port.onMessage.addListener(function (msg) {
    konsole.log('onMessage', msg);
    if (msg.type === 'initialState') {
      store.getState().then((state) => {
        konsole.log('initialState', msg.initialValue, state);
        publish({
          type: msg.type,
          value: state?.[msg.key] || msg.initialValue,
          key: msg.key,
          ack: true,
        });
      });
    }
    if (msg.type === 'setState') {
      store.updateState(msg.key, msg.value).then(() => {
        publish({
          type: msg.type,
          value: msg.value,
          key: msg.key,
          ack: true,
        });
      });
    }
  });
});
