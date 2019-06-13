import * as React from 'react';

import { authUtils } from '../utils';
import { AuthService, UserService } from '../service';

interface ILoginResponse {
  accessToken: string;
}

class Login extends React.Component<{}, {}> {
  handleLogin = async () => {
    authUtils.getAuthToken().then((token: string) => {
      AuthService.loginRequest(token).then((response: ILoginResponse) => {
        UserService.getUserProfile(response.accessToken).then(response => {
          console.log(response);
        });
      });
    });
  };

  render() {
    return (
      <div>
        <button type="submit" onClick={() => this.handleLogin()}>
          Login
        </button>
      </div>
    );
  }
}

export default Login;
