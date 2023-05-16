const ports = new Map();

const publish = (msg) => {
  ports.forEach((port) => {
    port.postMessage(msg);
  });
};

chrome.runtime.onConnect.addListener(function (port) {
  // console.assert(port.name === PORT_NAME);
  console.log('port', port);
  ports.set(port.name, port);
  port.onDisconnect.addListener(function (port) {
    ports.delete(port.name);
  });
  port.onMessage.addListener(function (msg) {
    if (msg.type === 'initialState') {
      chrome.storage.local.get(['state'], ({ state }) => {
        publish({
          type: msg.type,
          value: state?.[msg.key] || msg.value,
          key: msg.key,
          ack: true,
        });
      });
    }
    if (msg.type === 'setState') {
      chrome.storage.local.get(['state'], ({ state }) => {
        chrome.storage.local.set({
          // remove bookmark folders from taking up unnecessary space
          state: {
            ...state,
            [msg.key]: msg.value,
          },
        });

        publish({
          type: msg.type,
          value: msg.value,
          key: msg.key,
          ack: true,
        });
      });
    }
  });

  // if (request.type === 'initialState') {
  //   chrome.storage.local.get(['state'], ({ state }) => {
  //     console.log('state', state);
  //     sendResponse({
  //       value: state?.[request.key] || request.value,
  //       key: request.key,
  //       ack: true,
  //     });
  //   });
  // }
  // return true;
});
