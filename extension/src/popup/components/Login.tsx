import * as React from 'react';

import { authUtils } from '../utils';
import { AuthService, UserService } from '../service';
import * as GoogleLogo from '../../../public/assets/images/google-logo.svg';

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
      <div className={'login-wrapper'}>
        <button className={'google-button'} type="submit" onClick={() => this.handleLogin()}>
          <span className="google-button-icon">
            <img src={GoogleLogo} alt="" />
          </span>
          <span className={'google-button-text'}>Sign in with Google</span>
        </button>
      </div>
    );
  }
}

export default Login;
