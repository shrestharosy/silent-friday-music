import * as storageUtils from 'src/utils/storage.utils';
import * as storageConstants from 'src/constants/storage';

export function getAuthToken() {
  return new Promise((resolve, reject) => {
    chrome.identity.getAuthToken({ interactive: true }, token => {
      if (token) {
        resolve({ token: token });
      } else {
        reject(new Error('Auth'));
      }
    });
  });
}

//           if (status === 401 ) {
//             // This status may indicate that the cached
//             // access token was invalid. Retry once with
//             // a fresh token.
//             chrome.identity.removeCachedAuthToken({ token: access_token }, getTokenAndXhr);
//           }

export function isAuthenticated() {
  const token = storageUtils.getFromStorage(storageConstants.ACCESS_TOKEN);
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
