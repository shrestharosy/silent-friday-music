import * as React from 'react';
import axiosInstance from '../utils/axios';

interface IMainState extends IBroadcastResponse {
  isLoaded: boolean;
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
      avatar: '',
      name: '',
      streamUrl: '',
    };
  }
  handlePlay = () => {
    console.log('playing....');
  };

  async componentDidMount() {
    const action = {
      type: 'LOAD_AUDIO',
      data: 'https://www.youtube.com/watch?v=IHNzOHi8sJs',
    };
    chrome.runtime.sendMessage(action);

    // try {
    //   const { avatar, name, streamUrl } = await axiosInstance
    //     .post<IBroadcastResponse>('/broadcast', {
    //       requestUrl: 'https://www.youtube.com/watch?v=IHNzOHi8sJs',
    //     })
    //     .then(({ data }) => {
    //       console.log(data);
    //       return data;
    //     })
    //     .catch(error => {
    //       throw error;
    //     });

    //   this.setState({
    //     isLoaded: true,
    //     avatar,
    //     name,
    //     streamUrl,
    //   });
    // } catch (error) {}
  }

  render() {
    const { avatar, name, streamUrl, isLoaded } = this.state;
    return (
      <div>
        Let's play something...
        {isLoaded ? (
          <React.Fragment>
            <div>
              <img src={avatar} />
              <p>{name}</p>
            </div>
            <audio onPlay={this.handlePlay} controls src={streamUrl} />
          </React.Fragment>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }
}

export default Main;
