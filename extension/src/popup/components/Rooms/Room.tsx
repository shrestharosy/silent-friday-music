import * as React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { fillRoomAction, addToPlaylistAction } from 'src/actionCreators/actionCreator';
import * as storageUtils from 'src/utils/storage.utils';
import sendActionToBackground from 'src/popup/service/background.service';
import { IRoom } from './Rooms';
import NowPlaying from '../Songs/NowPlaying';
import axiosInstance from 'src/utils/axios';
import Playlist from '../Songs/Playlist';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeMute, faUserPlus, faDoorOpen, faListOl } from '@fortawesome/free-solid-svg-icons';

interface IMainState {
  isLoaded: boolean;
  searchLink: string;
  title: string | null;
  imageUrl: string | null;
  currentRoom: IRoom | null;
}

interface IRoomProps {
  roomId: string;
  fillRoomAction: typeof fillRoomAction;
  addToPlaylistAction: typeof addToPlaylistAction;
}

class Room extends React.Component<IRoomProps, IMainState> {
  constructor(props: Readonly<IRoomProps>) {
    super(props);
    this.state = {
      isLoaded: false,
      searchLink: '',
      title: null,
      imageUrl: null,
      currentRoom: null,
    };
  }

  componentDidMount() {
    const searchLink = storageUtils.getFromStorage('YOUTUBE_URL');
    const title = storageUtils.getFromStorage('YOUTUBE_TITLE');
    const imageUrl = storageUtils.getFromStorage('YOUTUBE_IMAGE');

    this.fetchRoomDetails();

    this.setState({
      searchLink: searchLink ? searchLink : '',
      title: title ? title : '',
      imageUrl: imageUrl ? imageUrl : '',
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

  render() {
    const { roomId } = this.props;
    const { searchLink, title, imageUrl, currentRoom } = this.state;
    return (
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
            <span>
              <FontAwesomeIcon icon={faDoorOpen} />
            </span>
          </div>
        </div>
        <form onSubmit={this.handleSubmit}>
          <input
            className="song-input"
            placeholder="Paste a youtube URL to add song to queue..."
            onChange={this.handleSearchLinkChange}
            value={searchLink}
          />
        </form>
        <NowPlaying title={title} imageUrl={imageUrl} />
        <Playlist roomId={roomId} />
        <div className="view-playlist-button">
          <span>
            View Full Playlist
            <FontAwesomeIcon icon={faListOl} className="playlist-icon" />
          </span>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (
  dispatch: Dispatch<{
    fillRoomAction: typeof fillRoomAction;
    addToPlaylistAction: typeof addToPlaylistAction;
  }>
) =>
  bindActionCreators(
    {
      fillRoomAction,
      addToPlaylistAction,
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(Room);
