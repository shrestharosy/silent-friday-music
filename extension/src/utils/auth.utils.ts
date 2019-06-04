function getAuthToken() {
  chrome.identity.getAuthToken({ interactive: true }, token => {
    if (token) {
      return token;
    }
  });
}

export const AuthUtils = {
  getAuthToken,
};
