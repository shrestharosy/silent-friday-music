import * as React from 'react';
import { IRoom } from './Rooms';

interface IRoomListProps {
  onRoomSelect: (id: string) => void;
  rooms: Array<IRoom>;
}

const RoomList: React.SFC<IRoomListProps> = ({ rooms, onRoomSelect }) => (
  <ul className='rooms-list'>
    <li>24/7 Lok Dohori</li>
    <li>Pre-weekend Chill</li>
    <li>Weekend pump up jamz</li>
    <li>White Noise and Concentration music</li>
    <li>Shitty music taste playlist</li>
    {rooms.map(({ name, _id }) => (
      <li onClick={() => onRoomSelect(_id)}>{name}</li>
    ))}
  </ul>
);

export default RoomList;
