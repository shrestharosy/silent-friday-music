import * as React from 'react';

import Main from './components/Main';
import CreateRoom from 'src/popup/components/Rooms/Create';

const BackgroundApp: React.SFC<{}> = () => (
  <React.Fragment>
    <CreateRoom />
  </React.Fragment>
);

export default BackgroundApp;
