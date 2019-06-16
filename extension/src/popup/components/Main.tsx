import * as React from 'react';

import WithAuthentication from '../hoc/withAuthentication';
import { storageUtils } from '../utils';
import store from '../store';
import sendActionToBackground from '../service/background.service';

import Room from './Room';

interface IUserProps {
  name: string;
  image: string;
}

class Main extends React.Component<IUserProps, {}> {
  logout = () => {
    storageUtils.clearStorage();
  };

  componentDidMount() {
    sendActionToBackground({
      type: 'INIT',
    });
  }

  dispatchAction = () => {
    store.dispatch({
      type: 'DEMO_ACTION',
      payload: 'ola',
    });
  };

  render() {
    const profile: IUserProps = storageUtils.getFromStorage('USER_PROFILE');
    return (
      <div>
        Welcome {profile ? profile : ''}
        <button onClick={() => this.logout()}>Logout</button>
        <div>List of rooms</div>
        <button onClick={() => this.dispatchAction()}>Action</button>
      </div>
    );
  }
}

export default WithAuthentication(Main);
