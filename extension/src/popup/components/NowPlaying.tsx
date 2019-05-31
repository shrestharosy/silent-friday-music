import * as React from 'react';

interface INowPlayingProps {
  title: string;
  imageUrl: string;
}

const NowPlaying: React.SFC<INowPlayingProps> = props => {
  const { title, imageUrl } = props;
  return (
    <div>
      <h3>Now Playing</h3>
      <img src={imageUrl} alt="" />
      {title}
    </div>
  );
};

export default NowPlaying;
