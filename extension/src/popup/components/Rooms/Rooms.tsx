import * as React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import axios from 'src/utils/axios';

import RoomList from './List';

import { fillActiveAction } from 'src/actionCreators/actionCreator';
import { AvailableComponents } from 'src/scripts/background/reducers/active';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

export interface IRoom {
  name: string;
  _id: string;
  master: string;
}

interface IRoomsState {
  isLoaded: boolean;
  rooms: Array<IRoom>;
  roomId?: string;
}

interface IRoomsProps {
  fillActiveAction: typeof fillActiveAction;
}

class Rooms extends React.Component<IRoomsProps, IRoomsState> {
  constructor(props: Readonly<IRoomsProps>) {
    super(props);
    this.state = {
      isLoaded: false,
      rooms: [],
    };
  }

  async componentDidMount() {
    try {
      const rooms = await axios
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
    this.props.fillActiveAction({ component: AvailableComponents.ROOM_DETAILS, id: roomId });
  };

  render() {
    const { rooms, isLoaded } = this.state;

    return (
      <React.Fragment>
        <div className="button-wrapper">
          <span>CREATE NEW ROOM</span>
          <span className="button-icon">
            <FontAwesomeIcon icon={faPlusCircle} />
          </span>
        </div>
        <div className={'common-wrapper rooms-wrapper'}>
          <div className={'title-wrapper'}>
            <span>Recent Rooms</span>
          </div>
          <div>{isLoaded && <RoomList rooms={rooms} onRoomSelect={this.handleDetailsView} />}</div>
        </div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<{ fillActiveAction: typeof fillActiveAction }>) =>
  bindActionCreators({ fillActiveAction }, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(Rooms);
