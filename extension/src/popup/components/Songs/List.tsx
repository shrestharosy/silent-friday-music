import * as React from 'react';

import { ISong } from 'src/scripts/background/reducers/song';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

interface ISongListProps {
  requests: Array<ISong>;
}

const SongList: React.SFC<ISongListProps> = ({ requests }) => (
  // <ul>
  //   {requests.length > 0 &&
  //     requests.map(({ title, thumbnailUrl }, index) => {
  //       return (
  //         <div>
  //           <img src={thumbnailUrl} alt="" />
  //           <li key={index}>{title}</li>
  //         </div>
  //       );
  //     })}
  // </ul>
  <div className="songs-list-wrapper">
    <ul className="songs-list">
      {requests.length > 0 &&
        requests.map(({ title, thumbnailUrl }, index) => {
          return (
            <li>
              <span>{title}</span>
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
