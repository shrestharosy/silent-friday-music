import * as React from 'react';
import { storageUtils } from '../utils';

interface IMainState {
  isLoaded: boolean;
  searchLink: string;
  title: string;
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
      title: '',
    };
  }

  componentDidMount() {
    const action = {
      type: 'GET_YOUTUBE_URL',
    };
    chrome.runtime.sendMessage(action, response => {
      console.log(response);
      alert('ola');
    });

    // const _this = this;
    // chrome.runtime.onMessage.addListener(function(
    //   request,
    //   sender,
    //   sendResponse
    // ) {
    //   debugger
    //   if (request.type === "YOUTUBE_URL") {
    //     debugger
    //     const { title, url } = request.data;
    //     console.log('popup', title. url)
    //     _this.setState({
    //       searchLink: url,
    //       title
    //     });
    //   }
    // });
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
    const { searchLink, title } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input placeholder="Put something cool!!!" onChange={this.handleSearchLinkChange} value={searchLink} />
          <p>Or</p>
          <div>Please start a YouTube video</div>
          <div>Title: {title}</div>
        </form>
      </div>
    );
  }
}

export default Main;
