import * as React from "react";
import { connect } from "react-redux";

import WithAuthentication from "../hoc/withAuthentication";
import { storageUtils } from "../utils";
import Store from "../store";

interface IUserProps {
  name: string;
  image: string;
}

class Main extends React.Component<IUserProps, {}> {
  logout = () => {
    storageUtils.clearStorage();
  };

  dispatchAction = () => {
    Store.dispatch({
      type: "DEMO_ACTION",
      payload: "ola"
    });
  };

  render() {
    const profile: IUserProps = storageUtils.getFromStorage("USER_PROFILE");
    return (
      <div>
        Welcome {profile ? profile : ""}
        <button onClick={() => this.logout()}>Logout</button>
        <div>List of rooms</div>
        <button onClick={() => this.dispatchAction()}>Action</button>
      </div>
    );
  }
}

export default WithAuthentication(Main);
