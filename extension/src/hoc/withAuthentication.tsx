import * as React from "react";
import Login from "../views/login";

const WithAuthentication = (Component: any) => (
  (props: any) => {
    /* eslint-disable no-undef */
    chrome.identity.getAuthToken({ interactive: true }, function(token) {
      if (token) {
        return <Component {...props} />;
      } else {
        return <Login />;
      }
    });
  }
);

export default WithAuthentication;
