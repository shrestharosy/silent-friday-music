import * as React from 'react';

import { connect } from 'react-redux';
import { IReduxState } from 'src/scripts/background/reducers/rootReducer';
import { IRoomReduxState } from '../../reducers/room';
import { IProfileReduxState } from '../../reducers/profile';
import { fillBroadcastAction } from 'src/actionCreators/actionCreator';
import { bindActionCreators, Dispatch } from 'redux';

import socketInstance from 'src/services/socket.service';

import Player from './Player';
import { BROADCAST_SONG_TIMESTAMP } from 'src/constants/socket';

interface ITimeKeeperProps {
  room: IRoomReduxState;
  profile: IProfileReduxState;
  fillBroadcastAction: typeof fillBroadcastAction;
}

class TimeKeeper extends React.Component<ITimeKeeperProps> {
  componentDidMount() {
    this.handleBeingMaster();
  }

  handleBeingMaster = () => {
    const { _id: profileId } = this.props.profile;
    const { master } = this.props.room;

    if (master === profileId) {
      this.props.fillBroadcastAction({
        streamUrl: 'http://localhost:3002/stream?v=https://www.youtube.com/watch?v=mZEbGGVrwOI',
        status: true,
      });
    }
  };

  componentDidUpdate() {
    this.handleBeingMaster();
  }

  handleTimestampUpdate = (timestamp: number) => {
    socketInstance.getIOInstance().emit(JSON.stringify({ type: BROADCAST_SONG_TIMESTAMP }), {
      payload: {
        timestamp,
      },
    });
  };

  render() {
    return <Player onTimestampUpdate={this.handleTimestampUpdate} />;
  }
}

const mapStateToProps = ({ room, profile }: IReduxState) => ({ room, profile });

const mapDipatchToProps = (dispatch: Dispatch<typeof fillBroadcastAction>) =>
  bindActionCreators({ fillBroadcastAction }, dispatch);

export default connect(
  mapStateToProps,
  mapDipatchToProps
)(TimeKeeper);
