import * as React from 'react';

import Login from '../components/Login';
import { authUtils } from '../utils';

const WithAuthentication = (Component: any) => {
  return (props: any) => {
    const checkIsAuthenticated = authUtils.isAuthenticated();
    if (checkIsAuthenticated) {
      console.log(Component);
      return <Component {...props} />;
    } else {
      return <Login />;
    }
  };
};

export default WithAuthentication;
