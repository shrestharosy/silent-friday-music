import Store from '../store';

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
  const token = Store.getState().auth.accessToken;
  if (token.length > 0) {
    return true;
  } else {
    return false;
  }
}

export const authUtils = {
  getAuthToken,
  isAuthenticated,
};
