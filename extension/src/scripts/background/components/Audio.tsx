import * as React from 'react';

interface IAudioProps {
  url: string;
  onTimestampUpdate?: (timestamp: number) => void;
  mute?: boolean;
}

interface IAudioState {
  nowPlayingUrl: string;
}

class Audio extends React.Component<IAudioProps, IAudioState> {
  audioRef: React.RefObject<HTMLAudioElement>;
  constructor(props: Readonly<IAudioProps>) {
    super(props);
    this.state = {
      nowPlayingUrl: props.url,
    };
    this.audioRef = React.createRef<HTMLAudioElement>();
  }
  componentDidMount() {
    this.startPlay();
    this.initializeEventHandlers();
  }
  startPlay = () => {
    this.audioRef.current.play();
    this.audioRef.current.currentTime;
  };

  initializeEventHandlers = () => {
    if (this.props.onTimestampUpdate) {
      this.audioRef.current.addEventListener('timeupdate', () => {
        this.props.onTimestampUpdate(this.audioRef.current.currentTime);
      });
    }
  };
  componentDidUpdate(prevProps: Readonly<IAudioProps>) {
    if (prevProps.url !== this.props.url) {
      this.setState(
        {
          nowPlayingUrl: this.props.url,
        },
        () => {
          this.startPlay();
        }
      );
    }
  }
  render() {
    const { url, mute = false } = this.props;

    return <audio ref={this.audioRef} src={url} muted={mute} />;
  }
}

export default Audio;
