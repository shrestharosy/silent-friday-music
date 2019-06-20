import * as React from 'react';
import RoomList from './List';
import Room from './Room';
import axiosInstance from 'src/utils/axios';

export interface IRoom {
  name: string;
  _id: string;
  master: string;
}

interface IRoomsState {
  isLoaded: boolean;
  rooms: Array<IRoom>;
  currentView: 'list' | 'details';
  roomId?: string;
}

class Rooms extends React.Component<{}, IRoomsState> {
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      isLoaded: false,
      rooms: [],
      currentView: 'details',
      roomId: '5cfcf9af8b1fe42d0f9aecd0',
    };
  }
  async componentDidMount() {
    try {
      const rooms = await axiosInstance
        .get('/rooms')
        .then(({ data }) => data)
        .catch(error => {
          throw error;
        });
      this.setState({
        rooms,
        isLoaded: true,
      });
      console.log(rooms);
    } catch (error) {}
  }
  handleDetailsView = (roomId: string) => {
    this.setState(prevState => ({
      currentView: prevState.currentView === 'list' ? 'details' : 'list',
      roomId,
    }));
  };
  render() {
    const { rooms, isLoaded, currentView } = this.state;

    return (
      <div>
        {isLoaded &&
          (currentView === 'list' ? (
            <RoomList rooms={rooms} onRoomSelect={this.handleDetailsView} />
          ) : (
            <Room roomId={this.state.roomId} />
          ))}
      </div>
    );
  }
}

export default Rooms;
