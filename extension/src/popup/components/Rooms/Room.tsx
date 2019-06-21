import * as React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { fillRoomAction } from 'src/actionCreators/actionCreator';
import * as storageUtils from 'src/utils/storage.utils';
import sendActionToBackground from 'src/popup/service/background.service';

import { IRoom } from './Rooms';
import NowPlaying from '../NowPlaying';
import axiosInstance from 'src/utils/axios';

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

  render() {
    const { searchLink, title, imageUrl, currentRoom } = this.state;
    return (
      <div>
        <div>
          Room <b>{currentRoom && currentRoom.name}</b>
        </div>
        >
        <form onSubmit={this.handleSubmit}>
          <input placeholder="Put something cool !!!" onChange={this.handleSearchLinkChange} value={searchLink} />
          <p>Or</p>
          <div>Try playing a YouTube video on browser tab</div>
        </form>
        <hr />
        <NowPlaying title={title} imageUrl={imageUrl} />
      </div>
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
