import * as React from 'react';

import socketService from 'src/services/socket.service';

import NowPlaying from './NowPlaying';
import TimeKeeper from './Phantom/TimeKeeper';
import { connect } from 'react-redux';
import { IReduxState } from '../reducers/rootReducer';
import { IActiveReduxState, AvailableComponents } from '../reducers/active';

const mapStateToProps = ({ active }: IReduxState) => ({ active });

interface IMainProps {
  active: IActiveReduxState;
}

class Main extends React.Component<IMainProps> {
  componentDidMount() {
    socketService.getIOInstance();
  }
  render() {
    const { active } = this.props;
    return (
      <React.Fragment>
        {active.component === AvailableComponents.ROOM_DETAILS && <NowPlaying roomId={active.id} />}
        <TimeKeeper />
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps)(Main);
