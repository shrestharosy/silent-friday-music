import * as React from 'react';

import { connect } from 'react-redux';
import { IReduxState } from 'src/scripts/background/reducers/rootReducer';
import { IRoomReduxState } from '../../reducers/room';
import { IProfileReduxState } from '../../reducers/profile';
import { fillBroadcastAction } from 'src/actionCreators/actionCreator';
import { bindActionCreators, Dispatch } from 'redux';

import getSocketInstance from 'src/services/socket.service';

import Player from './Player';
import { BROADCAST_SONG_TIMESTAMP, UPDATE_NOW_PLAYING } from 'src/constants/socket';
import { IBroadcastReduxState } from '../../reducers/broadcast';
import { INowPlayingReduxState } from '../../reducers/nowPlaying';

interface ITimeKeeperProps {
  room: IRoomReduxState;
  profile: IProfileReduxState;
  broadcast: IBroadcastReduxState;
  nowPlaying: INowPlayingReduxState;
  fillBroadcastAction: typeof fillBroadcastAction;
}

class TimeKeeper extends React.Component<ITimeKeeperProps> {
  componentDidMount() {
    this.handleBeingMaster();
  }

  handleBeingMaster = () => {
    const { _id: profileId } = this.props.profile;
    const { master } = this.props.room;

    if (master === profileId && master) {
      const { _id: songId, streamUrl, lengthSeconds } = this.getNowPlaying();
      this.props.fillBroadcastAction({ streamUrl, songId, status: true, lengthSeconds });
    }
  };

  getNowPlaying() {
    const { requests } = this.props.room;
    const { songId } = this.props.nowPlaying;
    if (songId) {
      // need to change;
      return requests[0];
    } else {
      return requests[0];
    }
  }

  componentDidUpdate(prevProps: Readonly<ITimeKeeperProps>) {
    const { master: prevMaster } = prevProps.room;
    const { _id: prevProfileId } = prevProps.profile;
    const { _id: profileId } = this.props.profile;
    const { master } = this.props.room;

    if (prevMaster !== master || prevProfileId !== profileId) {
      this.handleBeingMaster();
    }
  }

  // Add lengthSeconds to broadcast
  // Check if timmestamp = lengthSeconds
  // Change song : fillBroadcastAction
  // API for updating request array

  handleTimestampUpdate = (timestamp: number) => {
    const { songId, streamUrl } = this.props.broadcast;
    const { _id: roomId } = this.props.room;

    getSocketInstance()
      .getIOInstance()
      .emit(JSON.stringify({ type: BROADCAST_SONG_TIMESTAMP }), {
        receiverId: roomId,
        message: {
          type: UPDATE_NOW_PLAYING,
          payload: {
            songId,
            streamUrl,
            timestamp,
          },
        },
      });
  };

  render() {
    return <Player onTimestampUpdate={this.handleTimestampUpdate} />;
  }
}

const mapStateToProps = ({ room, profile, broadcast, nowPlaying }: IReduxState) => ({
  room,
  profile,
  broadcast,
  nowPlaying,
});

const mapDipatchToProps = (dispatch: Dispatch<typeof fillBroadcastAction>) =>
  bindActionCreators({ fillBroadcastAction }, dispatch);

export default connect(
  mapStateToProps,
  mapDipatchToProps
)(TimeKeeper);
