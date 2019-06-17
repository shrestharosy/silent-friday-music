import * as React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { fillProfileAction } from 'src/actionCreators/actionCreator';

import { authUtils } from '../utils';
import { AuthService, UserService } from '../service';
import * as GoogleLogo from '../../../public/assets/images/google-logo.svg';

interface ILoginResponse {
  accessToken: string;
}

interface ILoginProps {
  fillProfileAction: typeof fillProfileAction;
}

class Login extends React.Component<ILoginProps, {}> {
  handleLogin = async () => {
    authUtils.getAuthToken().then((token: string) => {
      AuthService.loginRequest(token).then((response: ILoginResponse) => {
        UserService.getUserProfile(response.accessToken).then(response => {
          this.props.fillProfileAction(response);
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

const mapDispatchToProps = (dispatch: Dispatch<typeof fillProfileAction>) =>
  bindActionCreators({ fillProfileAction }, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(Login);
