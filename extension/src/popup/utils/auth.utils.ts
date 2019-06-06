import { storageUtils } from '.';

function getAuthToken() {
  return new Promise((resolve, reject) => {
    chrome.identity.getAuthToken({ interactive: true }, token => {
      if (token) {
        resolve(token);
      } else {
        reject(new Error('Auth'));
      }
    });
  });
}

function isAuthenticated() {
  const token = storageUtils.getFromStorage('TOKEN');
  if (token) {
    return true;
  } else {
    return false;
  }
}

export const authUtils = {
  getAuthToken,
  isAuthenticated,
};
