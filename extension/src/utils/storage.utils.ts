const STORAGE = localStorage

function getDataFromStorage(dataType: string) {
  if (STORAGE[dataType]) {
    return STORAGE[dataType];
  } else {
    return null;
  }
}

function setDataToStorage(dataType: string, payload: string){
    STORAGE.setItem(dataType, payload)
}

function removeDataFromStorage(dataType: string){
  STORAGE.removeItem(dataType)
}

export const storageUtils = {
    getDataFromStorage,
    setDataToStorage,
    removeDataFromStorage
}