import * as React from 'react';

import { ISong } from 'src/scripts/background/reducers/song';

interface ISongListProps {
  songs: Array<ISong>;
}

const SongList: React.SFC<ISongListProps> = ({ songs }) => (
  <ul>
    {songs.map(({ _id }) => (
      <li>{_id}</li>
    ))}
  </ul>
);

export default SongList;
