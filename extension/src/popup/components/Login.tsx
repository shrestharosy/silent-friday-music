import * as React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { fillProfileAction, loginAction } from 'src/actionCreators/actionCreator';

import { AuthService, UserService } from '../service';
import * as GoogleLogo from '../../../public/assets/images/google-logo.svg';
import { getAuthToken } from '../../utils/auth.utils';

interface ILoginResponse {
  accessToken: string;
}

interface ILoginProps {
  loginAction: typeof loginAction;
  fillProfileAction: typeof fillProfileAction;
}

class Login extends React.Component<ILoginProps, {}> {
  handleLogin = async () => {
    const { token } = await getAuthToken()
      .then((response: { token: string }) => {
        return response;
      })
      .catch(error => {
        throw error;
      });

    await new Promise((resolve, reject) => {
      this.props.loginAction({ token }, resolve, reject);
    });

    // .then((response: ILoginResponse) => {
    //   UserService.getUserProfile(response.accessToken).then(response => {
    //     this.props.fillProfileAction(response);
    //   });
    // });
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
  bindActionCreators({ fillProfileAction, loginAction }, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(Login);
