import * as React from 'react';

interface IAudioProps {
  url: string;
}

const Audio: React.SFC<IAudioProps> = props => {
  const { url } = props;
  return (
    <audio preload={'auto'}>
      <source src={url} type="audio/mpeg" />
    </audio>
  );
};

export default Audio;
