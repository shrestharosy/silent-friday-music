const STORAGE = localStorage;

function getFromStorage(dataType: string) {
  if (STORAGE[dataType]) {
    return STORAGE[dataType];
  } else {
    return null;
  }
}

function setInStorage(dataType: string, payload: string) {
  STORAGE.setItem(dataType, payload);
}

function removeFromStorage(dataType: string) {
  STORAGE.removeItem(dataType);
}

function clearStorage() {
  STORAGE.clear();
}

function setInChromeStorage(key: string, value) {
  chrome.storage.local.set({ key: value }, () => {
    // console.log("Saved", key, value);
  });
}

function getFromChromeStorage(key: string) {
  chrome.storage.local.get('key', obj => {
    // console.log("myKey", obj);
  });
}

export const storageUtils = {
  getFromStorage,
  setInStorage,
  removeFromStorage,
  clearStorage,
  setInChromeStorage,
  getFromChromeStorage,
};
