import * as React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { fillRoomAction } from 'src/actionCreators/actionCreator';
import * as storageUtils from 'src/utils/storage.utils';
import sendActionToBackground from 'src/popup/service/background.service';

import { IRoom } from './Rooms';
import NowPlaying from '../NowPlaying';
import axiosInstance from 'src/utils/axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faVolumeMute,
  faUserPlus,
  faDoorOpen,
  faListOl,
  faChevronCircleLeft,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';

interface IMainState {
  isLoaded: boolean;
  searchLink: string;
  title: string | null;
  imageUrl: string | null;
  currentRoom: IRoom | null;
  showPlaylist: boolean;
}

interface IRoomProps {
  roomId: string;
  fillRoomAction: typeof fillRoomAction;
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
      showPlaylist: false,
    };
  }

  componentDidMount() {
    const searchLink = storageUtils.getFromStorage('YOUTUBE_URL');
    const title = storageUtils.getFromStorage('YOUTUBE_TITLE');
    const imageUrl = storageUtils.getFromStorage('YOUTUBE_IMAGE');

    this.fetchRoomDetails();

    this.setState({
      searchLink,
      title,
      imageUrl,
    });
  }

  handleSearchLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      searchLink: event.currentTarget.value,
    });
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    sendActionToBackground({
      type: 'LOAD_AUDIO',
      data: {
        requestUrl: this.state.searchLink,
      },
    });
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

  togglePlaylist = () => {
    this.setState(prevState => ({
      showPlaylist: !prevState.showPlaylist,
    }));
  };

  render() {
    const { searchLink, title, imageUrl, currentRoom, showPlaylist } = this.state;
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
          <div className="view-playlist-button" onClick={this.togglePlaylist}>
            <span>
              View Full Playlist
              <FontAwesomeIcon icon={faListOl} className="playlist-icon" />
            </span>
          </div>
        </div>

        <div className={`cd-panel cd-panel-bottom from-bottom ${showPlaylist ? 'is-visible' : ''} `}>
          <div className="cd-panel-container">
            <div className="container cd-panel-content">
              <div className="playlist-title-bar no-focus-outline">
                <button className="btn btn-one cd-panel-close " onClick={this.togglePlaylist}>
                  <FontAwesomeIcon icon={faChevronCircleLeft} className="back-icon" />
                </button>
                <span className="playlist-title">Full Playlist</span>
              </div>
              <div className="songs-list-wrapper">
                <ul className="songs-list">
                  <li>
                    <span>Song name Song name Song nameSong name Song nameSong name Song name Song name </span>
                    <span onClick={() => {}}>
                      <FontAwesomeIcon icon={faTimesCircle} className="close-icon" />
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<typeof fillRoomAction>) =>
  bindActionCreators(
    {
      fillRoomAction,
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(Room);
