import * as React from 'react';

import Login from '../components/Login';
import { isAuthenticated } from '../utils/auth.utils';

const WithAuthentication = (Component: any) => {
  return (props: any) => {
    const checkIsAuthenticated = isAuthenticated();
    if (checkIsAuthenticated) {
      return <Component {...props} />;
    } else {
      return <Login />;
    }
  };
};

export default WithAuthentication;
