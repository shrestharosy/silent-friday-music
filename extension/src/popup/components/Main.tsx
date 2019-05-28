import * as React from 'react';

interface IMainState {
  isLoaded: boolean;
  searchLink: string;
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
    };
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
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="Put something cool!!!"
            onChange={this.handleSearchLinkChange}
            value={this.state.searchLink}
          />
        </form>
      </div>
    );
  }
}

export default Main;
