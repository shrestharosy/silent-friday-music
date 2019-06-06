import * as React from 'react';

import WithAuthentication from '../hoc/withAuthentication';
import { storageUtils } from '../utils';

interface IUserProps {
  name: string;
  image: string;
}

class Main extends React.Component<{}, {}> {
  logout = () => {
    storageUtils.clearStorage();
  };

  render() {
    const profile: IUserProps = storageUtils.getFromStorage('USER_PROFILE');
    return (
      <div>
        Welcome {profile ? profile : ''}
        <button onClick={() => this.logout()}>Logout</button>
        <div>List of rooms</div>
      </div>
    );
  }
}

export default WithAuthentication(Main);
