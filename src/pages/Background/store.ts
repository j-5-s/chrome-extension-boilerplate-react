export class ChromeStorageLocal {
  key: string;
  constructor(key:string) {
    this.key = key;
  }

  updateState(key:string, value: any) {
    return new Promise(resolve => {
      chrome.storage.local.get([this.key], ({ state }) => {
        chrome.storage.local.set({
          // remove bookmark folders from taking up unnecessary space
          state: {
            ...state,
            [key]: value,
          },
        });
        resolve({key, value });
      })
    });
  }

  getState() {
    return new Promise(resolve => {
      chrome.storage.local.get([this.key], ({ state }) => {
        resolve(state);
      });
    });
  }
}