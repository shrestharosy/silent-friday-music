import * as React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { fillRoomAction, addToPlaylistAction, fetchCurrentSongDetailsAction } from 'src/actionCreators/actionCreator';
import * as storageUtils from 'src/utils/storage.utils';
import sendActionToBackground from 'src/popup/service/background.service';
import { IRoom } from './Rooms';
import NowPlaying from '../Songs/NowPlaying';
import axiosInstance from 'src/utils/axios';
import Playlist from '../Songs/Playlist';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeMute, faUserPlus, faDoorOpen, faListOl } from '@fortawesome/free-solid-svg-icons';
import { ISong } from 'src/scripts/background/reducers/song';
import { IReduxState } from 'src/scripts/background/reducers/rootReducer';
import { INowPlayingReduxState } from 'src/scripts/background/reducers/nowPlaying';

interface IMainState {
  isLoaded: boolean;
  searchLink: string;
  currentRoom: IRoom | null;
  showPlaylist: boolean;
  currentSong: ISong | null;
}

interface IRoomProps {
  roomId: string;
  songId: string;
  fillRoomAction: typeof fillRoomAction;
  addToPlaylistAction: typeof addToPlaylistAction;
  fetchCurrentSongDetailsAction: typeof fetchCurrentSongDetailsAction;
}

class Room extends React.Component<IRoomProps, IMainState> {
  constructor(props: Readonly<IRoomProps>) {
    super(props);
    this.state = {
      isLoaded: false,
      searchLink: '',
      currentRoom: null,
      showPlaylist: false,
      currentSong: null,
    };
  }

  componentDidMount() {
    const searchLink = storageUtils.getFromStorage('YOUTUBE_URL');
    const title = storageUtils.getFromStorage('YOUTUBE_TITLE');
    const imageUrl = storageUtils.getFromStorage('YOUTUBE_IMAGE');

    this.fetchRoomDetails();

    this.fetchSongDetails();

    this.setState({
      searchLink: searchLink ? searchLink : '',
    });
  }

  handleSearchLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      searchLink: event.currentTarget.value,
    });
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { searchLink } = this.state;
    sendActionToBackground({
      type: 'LOAD_AUDIO',
      data: {
        requestUrl: this.state.searchLink,
      },
    });

    this.addToPlaylist(searchLink);
  };

  addToPlaylist = (url: string) => {
    const { roomId, addToPlaylistAction } = this.props;
    addToPlaylistAction({ roomId, url });
  };

  fetchRoomDetails = async () => {
    if (this.props.roomId) {
      try {
        const currentRoom = await axiosInstance
          .get(`/rooms/${this.props.roomId}`)
          .then(({ data }) => data)
          .catch(error => {
            throw error;
          });
        this.setState({
          currentRoom,
        });
        this.props.fillRoomAction(currentRoom);
      } catch (error) {}
    }
  };

  fetchSongDetails = async () => {
    const { songId } = this.props;
    try {
      const currentSong = await new Promise<ISong>((resolve, reject) => {
        this.props.fetchCurrentSongDetailsAction(songId, resolve, reject);
      });
      console.log('c', currentSong);
      this.setState({
        currentSong,
      });
    } catch (error) {
      console.log('songDetails', error);
    }
  };

  togglePlaylist = () => {
    this.setState(prevState => ({
      showPlaylist: !prevState.showPlaylist,
    }));
  };

  handleLeaveRoom = async () => {
    console.log('leave room');
    try {
      await axiosInstance
        .post(`/rooms/${this.props.roomId}/leave`)
        .then(({ data }) => data)
        .catch(error => {
          throw error;
        });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { searchLink, currentRoom, showPlaylist, currentSong } = this.state;
    const { roomId } = this.props;
    return (
      <React.Fragment>
        <div className="common-wrapper dash-wrapper">
          <div className="dash-title-bar">
            <span className="room-name">{currentRoom && currentRoom.name}</span>
            <div className="dash-buttons">
              <span>
                <FontAwesomeIcon icon={faVolumeMute} />
              </span>
              <span>
                <FontAwesomeIcon icon={faUserPlus} />
              </span>
              <span onClick={this.handleLeaveRoom}>
                <FontAwesomeIcon icon={faDoorOpen} />
              </span>
            </div>
          </div>
          <div className="form-wrapper">
            <form onSubmit={this.handleSubmit}>
              <input
                className="song-input"
                placeholder="Paste a youtube URL to add song to queue..."
                onChange={this.handleSearchLinkChange}
                value={searchLink}
              />
            </form>
          </div>
          {currentSong && <NowPlaying title={currentSong.title} imageUrl={currentSong.thumbnailUrl} />}
          <div className="view-playlist-button" onClick={this.togglePlaylist}>
            <span>
              View Full Playlist
              <FontAwesomeIcon icon={faListOl} className="playlist-icon" />
            </span>
          </div>
        </div>
        <Playlist roomId={roomId} showPlaylist={showPlaylist} togglePlaylist={this.togglePlaylist} />
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (
  dispatch: Dispatch<{
    fillRoomAction: typeof fillRoomAction;
    addToPlaylistAction: typeof addToPlaylistAction;
    fetchCurrentSongDetailsAction: typeof fetchCurrentSongDetailsAction;
  }>
) =>
  bindActionCreators(
    {
      fillRoomAction,
      addToPlaylistAction,
      fetchCurrentSongDetailsAction,
    },
    dispatch
  );

const mapStateToProps = ({ nowPlaying: { songId } }: IReduxState) => ({ songId });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Room);
