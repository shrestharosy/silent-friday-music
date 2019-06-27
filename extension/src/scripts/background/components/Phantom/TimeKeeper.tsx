import * as React from 'react';
import config from 'src/config';

import { connect } from 'react-redux';
import { IReduxState } from 'src/scripts/background/reducers/rootReducer';
import { IRoomReduxState } from '../../reducers/room';
import { IProfileReduxState } from '../../reducers/profile';
import {
  fillBroadcastAction,
  removeFinishedSongAction,
  resetBroadcastStateAction,
} from 'src/actionCreators/actionCreator';
import { bindActionCreators, Dispatch } from 'redux';

import getSocketInstance from 'src/services/socket.service';

import Player from './Player';
import { BROADCAST_SONG_TIMESTAMP, UPDATE_NOW_PLAYING } from 'src/constants/socket';
import { IBroadcastReduxState } from '../../reducers/broadcast';
import { INowPlayingReduxState } from '../../reducers/nowPlaying';
import { removeFinishedSong } from 'src/sagas/room/apis';

interface ITimeKeeperProps {
  room: IRoomReduxState;
  profile: IProfileReduxState;
  broadcast: IBroadcastReduxState;
  nowPlaying: INowPlayingReduxState;
  fillBroadcastAction: typeof fillBroadcastAction;
  removeFinishedSongAction: typeof removeFinishedSongAction;
  resetBroadcastStateAction: typeof resetBroadcastStateAction;
}

class TimeKeeper extends React.Component<ITimeKeeperProps> {
  componentDidMount() {
    this.handleBeingMaster();
  }

  handleBeingMaster = () => {
    const { _id: profileId } = this.props.profile;
    const { master } = this.props.room;

    if (master === profileId && master) {
      const { songId } = this.props.nowPlaying;
      const { requests } = this.props.room;

      if (!songId && requests.length > 0) {
        const { _id: songId, streamUrl, lengthSeconds } = this.getNowPlaying();
        this.props.fillBroadcastAction({ streamUrl, songId, status: true, lengthSeconds });
      }
    }
  };

  getNowPlaying() {
    const { requests } = this.props.room;
    return requests[0];
  }

  getNextSongIndex() {
    let nextSongIndex = -1;

    const { requests } = this.props.room;
    const { songId } = this.props.nowPlaying;
    const index = requests.findIndex(({ _id }) => _id === songId);

    if (index > -1 && index + 1 < requests.length) {
      nextSongIndex = index + 1;
    }
    return nextSongIndex;
  }

  componentDidUpdate(prevProps: Readonly<ITimeKeeperProps>) {
    const { master: prevMaster, requests: prevRequests } = prevProps.room;
    const { _id: prevProfileId } = prevProps.profile;
    const { _id: profileId } = this.props.profile;
    const { master, requests } = this.props.room;

    if (prevMaster !== master || prevProfileId !== profileId || prevRequests.length !== requests.length) {
      this.handleBeingMaster();
    }
  }

  handleTimestampUpdate = (timestamp: number) => {
    const { songId, streamUrl, lengthSeconds } = this.props.broadcast;
    const { _id: roomId } = this.props.room;
    console.log(`handle timestamp update ${timestamp} / ${lengthSeconds}`);

    if (roomId && lengthSeconds && timestamp >= lengthSeconds - 1) {
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
    const nextSongIndex = this.getNextSongIndex();
    setTimeout(async () => {
      if (nextSongIndex > -1) {
        console.log('removing song from playlist...');
        const { streamUrl, _id: songId, lengthSeconds } = this.props.room.requests[nextSongIndex];

        await this.removeSongFromPlaylist();
        console.log('removed song... filling broadcast...');
        this.props.fillBroadcastAction({ streamUrl, songId, status: true, lengthSeconds });
        console.log('new broadcast ready...');
      } else {
        await this.removeSongFromPlaylist();
        this.props.resetBroadcastStateAction();
      }
    }, config.ApiEnv.songChangeBufferTime);
  };

  removeSongFromPlaylist = async () => {
    try {
      const { _id: roomId } = this.props.room;
      const { _id: songId } = this.getNowPlaying();
      await removeFinishedSong({ roomId, songId });
    } catch (error) {
      console.log('removeSongFromPlaylist', error);
    }
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
  bindActionCreators({ fillBroadcastAction, removeFinishedSongAction, resetBroadcastStateAction }, dispatch);

export default connect(
  mapStateToProps,
  mapDipatchToProps
)(TimeKeeper);
