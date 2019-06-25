import * as React from 'react';

import { ISong } from 'src/scripts/background/reducers/song';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

interface ISongListProps {
  list: Array<ISong>;
}

const SongList: React.SFC<ISongListProps> = ({ list }) => (
  <div className="songs-list-wrapper">
    <ul className="songs-list">
      {list.length > 0 &&
        list.map(({ title, thumbnailUrl }, index) => {
          return (
            <li>
              <span className="current-song">
                <FontAwesomeIcon icon={faPlayCircle} className="current-icon" />
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