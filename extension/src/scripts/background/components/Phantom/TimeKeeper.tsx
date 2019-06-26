import * as React from 'react';
import config from 'src/config';

import { connect } from 'react-redux';
import { IReduxState } from 'src/scripts/background/reducers/rootReducer';
import { IRoomReduxState } from '../../reducers/room';
import { IProfileReduxState } from '../../reducers/profile';
import { fillBroadcastAction, removeFinishedSongAction } from 'src/actionCreators/actionCreator';
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
  removeFinishedSongAction: typeof removeFinishedSongAction;
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

  getNextSong() {
    const { requests } = this.props.room;
    const { songId } = this.props.nowPlaying;
    const index = requests.findIndex(({ _id }) => _id === songId);
    if (index > -1) {
      if (typeof requests[index + 1] === 'undefined') {
        console.log('Last song in array...');
      } else {
        return requests[index + 1];
      }
    } else {
      console.log('song not found in requests array');
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

  handleTimestampUpdate = (timestamp: number) => {
    const { songId, streamUrl, lengthSeconds } = this.props.broadcast;
    const { _id: roomId } = this.props.room;

    if (timestamp >= lengthSeconds) {
      console.log(timestamp, lengthSeconds, 'Partys over');
      this.changeSong();
    }

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

  changeSong = () => {
    const { _id: roomId } = this.props.room;
    const { _id: songId, streamUrl, lengthSeconds } = this.getNextSong();
    setTimeout(() => {
      this.props.fillBroadcastAction({ streamUrl, songId, status: true, lengthSeconds });
      const resp = new Promise((resolve, reject) => {
        return this.props.removeFinishedSongAction({ roomId, songId }, resolve, reject);
      });
      console.log(resp);
    }, config.ApiEnv.songChangeBufferTime);
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
  bindActionCreators({ fillBroadcastAction, removeFinishedSongAction }, dispatch);

export default connect(
  mapStateToProps,
  mapDipatchToProps
)(TimeKeeper);
