import * as React from 'react';

import socketService from 'src/services/socket.service';

import Audio from './Audio';
import TimeKeeper from './Phantom/TimeKeeper';

class Main extends React.Component<{}> {
  componentDidMount() {
    socketService.getIOInstance();
  }
  render() {
    return (
      <React.Fragment>
        {/* <Audio url={''} /> */}
        <TimeKeeper />
      </React.Fragment>
    );
  }
}

export default Main;
