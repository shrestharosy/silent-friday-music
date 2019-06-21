import * as React from 'react';

interface INowPlayingProps {
  title: string;
  imageUrl: string;
}

const NowPlaying: React.SFC<INowPlayingProps> = props => {
  const { title, imageUrl } = props;
  return (
    <div className="now-playing-wrapper">
      <div>
        <img src={imageUrl} alt="" className="now-playing-img" />
      </div>
      <div>
        <span className="now-playing-info">Now Playing</span>
        <span className="now-playing-title">{title}</span>
      </div>
    </div>
  );
};

export default NowPlaying;
