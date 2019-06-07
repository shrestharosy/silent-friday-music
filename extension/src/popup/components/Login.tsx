import * as React from 'react';

import { AuthService, UserService } from '../../service';
import { authUtils } from '../utils';

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
