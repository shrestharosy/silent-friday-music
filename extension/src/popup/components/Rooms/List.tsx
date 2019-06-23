import * as React from 'react';
import { IRoom } from './Rooms';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";

interface IRoomListProps {
  onRoomSelect: (id: string) => void;
  rooms: Array<IRoom>;
}

const RoomList: React.SFC<IRoomListProps> = ({ rooms, onRoomSelect }) => (
  <ul className='rooms-list'>
    <li><FontAwesomeIcon icon={faPlayCircle} className="fa-icon-play" /> 24/7 Lok Dohori</li>
    <li><FontAwesomeIcon icon={faPlayCircle} className="fa-icon-play" /> Pre-weekend Chill</li>
    <li><FontAwesomeIcon icon={faPlayCircle} className="fa-icon-play" /> Weekend pump up jamz</li>
    <li><FontAwesomeIcon icon={faPlayCircle} className="fa-icon-play" /> White Noise and Concentration music</li>
    <li><FontAwesomeIcon icon={faPlayCircle} className="fa-icon-play" /> Shitty music taste playlist</li>
    {rooms.map(({ name, _id }) => (
      <li onClick={() => onRoomSelect(_id)}>
        <FontAwesomeIcon icon={faPlayCircle} className="fa-icon-play" />
        <span>{name}</span>
      </li>
    ))}
  </ul>
);

export default RoomList;
