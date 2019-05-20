import * as React from "react";

import LoginView from "./LoginView";
import Wrapper from "../wrapper";
import { storageUtils } from "../../utils/storage.utils";

interface ILoginState {
  isLoggedIn: boolean;
}

class Login extends React.Component<{}, ILoginState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
  }

  handleLogin = () => {
    /* eslint-disable no-undef */

    debugger;

    chrome.identity.getProfileUserInfo(data => {
      debugger;
    });

    chrome.identity.getAuthToken({ interactive: true }, token => {
      debugger;
      // if (token) {
      //   storageUtils.setDataToStorage("TOKEN", token)
      //   this.setState({
      //     isLoggedIn: true
      //   });
      // }
    });
  };

  render() {
    const { isLoggedIn } = this.state;
    if (isLoggedIn) {
      return <Wrapper />;
    } else {
      return <LoginView handleLogin={this.handleLogin} />;
    }
  }
}

export default Login;
