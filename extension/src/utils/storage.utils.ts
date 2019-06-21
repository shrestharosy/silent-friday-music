const STORAGE = localStorage;

export function getFromStorage(dataType: string) {
  if (STORAGE[dataType]) {
    return STORAGE[dataType];
  } else {
    return null;
  }
}

export function setInStorage(dataType: string, payload: string) {
  STORAGE.setItem(dataType, payload);
}

export function removeFromStorage(dataType: string) {
  STORAGE.removeItem(dataType);
}

export function clearStorage() {
  STORAGE.clear();
}

export function setInChromeStorage(key: string, value) {
  chrome.storage.local.set({ key: value }, () => {
    // console.log("Saved", key, value);
  });
}

export function getFromChromeStorage(key: string) {
  chrome.storage.local.get('key', obj => {
    // console.log("myKey", obj);
  });
}
