import * as React from 'react';

import { AuthService } from '../../service';
import { AuthUtils } from '../utils';

interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
}

class Login extends React.Component<{}, {}> {
  handleLogin = async () => {
    AuthUtils.getAuthToken().then((token: string) => {
      AuthService.loginRequest(token).then((response: ILoginResponse) => {
        console.log(response);
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
