import * as React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import {
  fillRoomAction,
  addToPlaylistAction,
  fetchCurrentSongDetailsAction,
  fetchRoomInfoAction,
  leaveRoomAction,
  fillActiveAction,
  fillNowPlayingAction,
  fillBroadcastAction,
  fillPlayerAction,
} from 'src/actionCreators/actionCreator';
import * as storageUtils from 'src/utils/storage.utils';
import sendActionToBackground from 'src/popup/service/background.service';
import { IRoom } from './Rooms';
import NowPlaying from '../Songs/NowPlaying';
import Playlist from '../Songs/Playlist';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeMute, faUserPlus, faDoorOpen, faListOl, faPlus, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { ISong } from 'src/scripts/background/reducers/song';
import { IReduxState } from 'src/scripts/background/reducers/rootReducer';
import { AvailableComponents } from 'src/scripts/background/reducers/active';
import AddMembers from './AddMembers/AddMembers';

interface IMainState {
  isLoaded: boolean;
  searchLink: string;
  currentRoom: IRoom | null;
  showPlaylist: boolean;
  showAddMembers: boolean;
  currentSong: ISong | null;
  mute: boolean;
  isSubmitting: boolean;
}

interface IRoomProps {
  roomId: string;
  songId: string;
  fillRoomAction: typeof fillRoomAction;
  fillNowPlayingAction: typeof fillNowPlayingAction;
  addToPlaylistAction: typeof addToPlaylistAction;
  fetchRoomInfoAction: typeof fetchRoomInfoAction;
  fetchCurrentSongDetailsAction: typeof fetchCurrentSongDetailsAction;
  leaveRoomAction: typeof leaveRoomAction;
  fillActiveAction: typeof fillActiveAction;
  fillBroadcastAction: typeof fillBroadcastAction;
  fillPlayerAction: typeof fillPlayerAction;
}

class Room extends React.Component<IRoomProps, IMainState> {
  constructor(props: Readonly<IRoomProps>) {
    super(props);
    this.state = {
      isLoaded: false,
      searchLink: '',
      currentRoom: null,
      showPlaylist: false,
      showAddMembers: false,
      currentSong: null,
      mute: false,
      isSubmitting: false
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

  componentDidUpdate(prevProps: Readonly<IRoomProps>) {
    const currentSongId = this.props.songId;
    const prevSongId = prevProps.songId;

    if (currentSongId !== prevSongId) {
      this.fetchSongDetails();
    }
  }

  handleSearchLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      searchLink: event.currentTarget.value,
    });
  };

  handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const { searchLink } = this.state;

    this.addToPlaylist(searchLink);
  };

  addToPlaylist = async (url: string) => {
    try {
      this.setState({
        isSubmitting: true
      });
      const response =  await new Promise((resolve, reject) => {
        this.props.addToPlaylistAction(
          {
            roomId: this.props.roomId,
            url,
          },
          resolve,
          reject
        );
      });
      
        this.setState({
          searchLink: ''
        });
      
    } catch (error) {}
     finally {
      this.setState({
        isSubmitting: false
      });
     }
  };

  toggleMute = () => {
    const { mute } = this.state;
    this.setState({
      mute: !mute,
    });
    this.props.fillPlayerAction({ mute: !mute });
  };

  fetchRoomDetails = async () => {
    if (this.props.roomId) {
      const { roomId } = this.props;
      try {
        const currentRoom = await new Promise<IRoom>((resolve, reject) => {
          this.props.fetchRoomInfoAction(roomId, resolve, reject);
        });
        this.setState({
          currentRoom,
        });
      } catch (error) {}
    }
  };

  fetchSongDetails = async () => {
    const { songId } = this.props;
    if (songId.length > 0) {
      try {
        const currentSong = await new Promise<ISong>((resolve, reject) => {
          this.props.fetchCurrentSongDetailsAction(songId, resolve, reject);
        });
        this.setState({
          currentSong,
        });
      } catch (error) {}
    }
  };

  togglePlaylist = () => {
    this.setState(prevState => ({
      showPlaylist: !prevState.showPlaylist,
    }));
  };

  toggleAddMembers = () => {
    this.setState(prevState => ({
      showAddMembers: !prevState.showAddMembers,
    }));
  };

  handleLeaveRoom = async () => {
    try {
      await new Promise((resolve, reject) => {
        this.props.leaveRoomAction(this.props.roomId, resolve, reject);
      });
      this.props.fillActiveAction({
        component: AvailableComponents.ROOM_LIST,
        id: '',
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { searchLink, currentRoom, showPlaylist, currentSong, mute, showAddMembers, isSubmitting } = this.state;
    const { roomId } = this.props;
    return (
      <React.Fragment>
        <div className="common-wrapper dash-wrapper">
          <div className="dash-title-bar">
            <span className="room-name">{currentRoom && currentRoom.name}</span>
            <div className="dash-buttons">
              <span onClick={() => this.toggleMute()} className={`${mute ? 'is-muted' : ''} tooltip`}>
                <FontAwesomeIcon icon={faVolumeMute} />
                <span className="tooltiptext">Mute</span>
              </span>
              <span onClick={this.toggleAddMembers} className={`tooltip`}>
                <FontAwesomeIcon icon={faUserPlus} />
                <span className="tooltiptext">Add People</span>
              </span>
              <span onClick={this.handleLeaveRoom} className={`tooltip`}>
                <FontAwesomeIcon icon={faDoorOpen} />
                <span className="tooltiptext">Leave Room</span>
              </span>
            </div>
          </div>
          <form>
            <div className="form-wrapper">
              <input
                className="song-input"
                placeholder="Paste a youtube URL to add song to queue..."
                onChange={this.handleSearchLinkChange}
                value={searchLink}
                disabled={this.state.isSubmitting}
              />
              <button
                className="song-input-button"
                onClick={this.handleSubmit}
                disabled={this.state.isSubmitting}
              > 
              { isSubmitting ? <FontAwesomeIcon icon={faSpinner} spin /> : <FontAwesomeIcon icon={faPlus} /> }
              </button>
            </div>
          </form>
          {currentSong ? (
            <NowPlaying title={currentSong.title} imageUrl={currentSong.thumbnailUrl} />
          ) : (
            <span className="info">Not playing any songs at the moment</span>
          )}
          <div className="view-playlist-button" onClick={this.togglePlaylist}>
            <span>
              View Full Playlist
              <FontAwesomeIcon icon={faListOl} className="playlist-icon" />
            </span>
          </div>
        </div>
        <Playlist
          roomId={roomId}
          showPlaylist={showPlaylist}
          togglePlaylist={this.togglePlaylist}
          currentSongId={currentSong && currentSong._id}
        />
        <AddMembers roomId={roomId} showAddMembers={showAddMembers} toggleAddMembers={this.toggleAddMembers} />
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (
  dispatch: Dispatch<{
    fillRoomAction: typeof fillRoomAction;
    fillNowPlayingAction: typeof fillNowPlayingAction;
    addToPlaylistAction: typeof addToPlaylistAction;
    fetchRoomInfoAction: typeof fetchRoomInfoAction;
    fetchCurrentSongDetailsAction: typeof fetchCurrentSongDetailsAction;
    leaveRoomAction: typeof leaveRoomAction;
    fillActiveAction: typeof fillActiveAction;
    fillPlayerAction: typeof fillPlayerAction;
  }>
) =>
  bindActionCreators(
    {
      fillRoomAction,
      fillNowPlayingAction,
      addToPlaylistAction,
      fetchRoomInfoAction,
      fetchCurrentSongDetailsAction,
      leaveRoomAction,
      fillActiveAction,
      fillBroadcastAction,
      fillPlayerAction,
    },
    dispatch
  );

const mapStateToProps = ({ nowPlaying: { songId } }: IReduxState) => ({
  songId,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Room);
