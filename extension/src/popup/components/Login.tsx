import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { fillProfileAction, loginAction } from 'src/actionCreators/actionCreator';
import { getAuthToken } from '../utils/auth.utils';
import * as GoogleLogo from '../../../public/assets/images/google-logo.svg';
import { fillActiveAction } from 'src/actionCreators/actionCreator';
import { AvailableComponents } from 'src/scripts/background/reducers/active';

interface ILoginResponse {
  accessToken: string;
}

interface ILoginProps {
  loginAction: typeof loginAction;
  fillProfileAction: typeof fillProfileAction;
  fillActiveAction: typeof fillActiveAction;
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

    await this.fetchJwtToken(token);
    this.props.fillActiveAction({
      component: AvailableComponents.ROOM_LIST,
      id: '',
    });

    // .then((response: ILoginResponse) => {
    //   UserService.getUserProfile(response.accessToken).then(response => {
    //     this.props.fillProfileAction(response);
    //   });
    // });
  };

  fetchJwtToken = async (token: string) => {
    await new Promise((resolve, reject) => {
      this.props.loginAction({ token }, resolve, reject);
    });
  };

  render() {
    return (
        <div className={"login-wrapper"}>
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

const mapDispatchToProps = (
  dispatch: Dispatch<{
    fillProfilAction: typeof fillProfileAction;
    fillActiveAction: typeof fillActiveAction;
    loginAction: typeof loginAction;
  }>
) => bindActionCreators({ fillProfileAction, fillActiveAction, loginAction }, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(Login);
