import * as React from 'react';

import { ISong } from 'src/scripts/background/reducers/song';

interface ISongListProps {
  requests: Array<ISong>;
}

const SongList: React.SFC<ISongListProps> = ({ requests }) => (
  <ul>
    {requests.length > 0 &&
      requests.map(({ title, thumbnailUrl }, index) => {
        return (
          <div>
            <img src={thumbnailUrl} alt="" />
            <li key={index}>{title}</li>
          </div>
        );
      })}
  </ul>
);

export default SongList;
