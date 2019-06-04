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

export const AuthUtils = {
  getAuthToken,
};
