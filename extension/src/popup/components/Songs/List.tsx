import * as React from 'react';

import { ISong } from 'src/scripts/background/reducers/song';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

interface ISongListProps {
  list: Array<ISong>;
  currentSongId: string;
}

const SongList: React.SFC<ISongListProps> = ({ list, currentSongId }) => (
  <div className="songs-list-wrapper">
    <ul className="songs-list">
      {list.length > 0 &&
        list.map(({ title, _id }, index) => {
          return (
            <li key={index}>
              <span className={`${_id === currentSongId ? 'current-song' : ''}`}>
                {_id === currentSongId ? <FontAwesomeIcon icon={faPlayCircle} className="current-icon" /> : ''}
                {title}
              </span>
              <span onClick={() => {}}>
                <FontAwesomeIcon icon={faTimesCircle} className="close-icon" />
              </span>
            </li>
          );
        })}
    </ul>
  </div>
);

export default SongList;
