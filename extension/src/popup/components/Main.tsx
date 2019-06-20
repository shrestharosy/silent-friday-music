import * as React from 'react';

import WithAuthentication from '../hoc/withAuthentication';
import * as storageUtils from 'src/utils/storage.utils';
import * as storageConstants from 'src/constants/storage';
import store from '../store';
import sendActionToBackground from '../service/background.service';

import Rooms from './Rooms/Rooms';

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
    const profile: IUserProps = storageUtils.getFromStorage(storageConstants.USER_PROFILE);
    return (
      <div>
        Welcome {profile ? profile : ''}
        <button onClick={() => this.logout()}>Logout</button>
        <div>List of rooms</div>
        <Rooms />
      </div>
    );
  }
}

export default WithAuthentication(Main);
