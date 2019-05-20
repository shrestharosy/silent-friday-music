import * as React from "react";
import WrapperView from "./WrapperView";
import Login from "../login";
import { storageUtils } from "../../utils/storage.utils";

interface IWrapperState {
  isLoggedIn: boolean;
}

class Wrapper extends React.Component<{}, IWrapperState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
  }

  componentDidMount() {
    /* eslint-disable no-undef */
    const token = storageUtils.getDataFromStorage("TOKEN")
    if(token){
      this.setState({
        isLoggedIn: true
      })
    }
  }

  handleLogout = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    storageUtils.removeDataFromStorage("TOKEN");
    this.setState({
      isLoggedIn: false
    });
  };

  revokeToken = () => {
    chrome.identity.getAuthToken({ interactive: false }, function(
      current_token
    ) {
      if (!chrome.runtime.lastError) {
        chrome.identity.removeCachedAuthToken(
          { token: current_token },
          function() {}
        );

        var xhr = new XMLHttpRequest();
        xhr.open(
          "GET",
          "https://accounts.google.com/o/oauth2/revoke?token=" + current_token
        );
        xhr.send();

        
      }
    });
  };

  render() {
    const { isLoggedIn } = this.state;
    if (isLoggedIn) {
      return <WrapperView handleLogout={this.handleLogout} />;
    } else {
      return <Login />;
    }
  }
}

export default Wrapper;
