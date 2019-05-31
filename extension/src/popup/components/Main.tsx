import * as React from 'react';
import { storageUtils } from '../utils';
import NowPlaying from './NowPlaying';

interface IMainState {
  isLoaded: boolean;
  searchLink: string;
  title: string | null;
  imageUrl: string | null;
}

interface IBroadcastResponse {
  avatar: string;
  name: string;
  streamUrl: string;
}

class Main extends React.Component<{}, IMainState> {
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      isLoaded: false,
      searchLink: '',
      title: null,
      imageUrl: null,
    };
  }

  componentDidMount() {
    const searchLink = localStorage.getItem('YOUTUBE_URL');
    const title = localStorage.getItem('YOUTUBE_TITLE');
    const imageUrl = localStorage.getItem('YOUTUBE_IMAGE');

    this.setState({
      searchLink,
      title,
      imageUrl,
    });
  }

  sendActionToBackground = ({ type, data }: { type: string; data?: Object }) => {
    const action = {
      type,
      data,
    };
    chrome.runtime.sendMessage(action);
  };

  handleSearchLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      searchLink: event.currentTarget.value,
    });
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.sendActionToBackground({
      type: 'LOAD_AUDIO',
      data: {
        requestUrl: this.state.searchLink,
      },
    });
  };

  render() {
    const { searchLink, title, imageUrl } = this.state;
    return (
      <div>
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

export default Main;
