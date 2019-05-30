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
  setInChromeStorage,
  getFromChromeStorage,
};
