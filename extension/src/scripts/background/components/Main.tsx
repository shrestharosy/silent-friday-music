import * as React from 'react';

import NowPlaying from './NowPlaying';
import TimeKeeper from './Phantom/TimeKeeper';
import { connect } from 'react-redux';
import { IReduxState } from '../reducers/rootReducer';
import { IActiveReduxState, AvailableComponents } from '../reducers/active';
import * as storage from 'src/utils/storage.utils';
import { ACCESS_TOKEN } from 'src/constants/storage';
import SocketHandler from './SocketHandler';

const mapStateToProps = ({ active }: IReduxState) => ({ active });

interface IMainProps {
  active: IActiveReduxState;
}

class Main extends React.Component<IMainProps> {
  render() {
    const { active } = this.props;
    return (
      <React.Fragment>
        {active.component === AvailableComponents.ROOM_DETAILS && <NowPlaying roomId={active.id} />}
        {storage.getFromStorage(ACCESS_TOKEN) && <TimeKeeper />}
        {storage.getFromStorage(ACCESS_TOKEN) && active.component === AvailableComponents.ROOM_DETAILS && (
          <SocketHandler />
        )}
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps)(Main);
