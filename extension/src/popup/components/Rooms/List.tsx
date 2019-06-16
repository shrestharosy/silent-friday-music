import * as React from 'react';
import { IRoom } from './Rooms';

interface IRoomListProps {
  onRoomSelect: (id: string) => void;
  rooms: Array<IRoom>;
}

const RoomList: React.SFC<IRoomListProps> = ({ rooms, onRoomSelect }) => (
  <ul>
    {rooms.map(({ name, _id }) => (
      <li onClick={() => onRoomSelect(_id)}>{name}</li>
    ))}
  </ul>
);

export default RoomList;
