import * as React from 'react';
import { IRoom } from './Rooms';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';

interface IRoomListProps {
  onRoomSelect: (id: string) => void;
  rooms: Array<IRoom>;
}

const RoomList: React.SFC<IRoomListProps> = ({ rooms, onRoomSelect }) => (
  <ul className="rooms-list">
    {rooms.map(({ name, _id }) => (
      <li key={_id} onClick={() => onRoomSelect(_id)}>
        <FontAwesomeIcon icon={faPlayCircle} className="fa-icon-play" />
        <span>{name}</span>
      </li>
    ))}
  </ul>
);

export default RoomList;
