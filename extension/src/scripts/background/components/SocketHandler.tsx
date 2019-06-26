import * as React from 'react';
import { IProfileReduxState } from '../reducers/profile';
import getSocketInstance, { ISocketMessage } from 'src/services/socket.service';
import { IRoomReduxState } from '../reducers/room';
import {
  REQUEST_TO_BE_MASTER,
  BROADCAST_MASTER_SELECTION_REQUEST,
  CHECK_MASTER_IS_ONLINE,
  ACK_MASTER_IS_ONLINE,
} from 'src/constants/socket';
import { IReduxState } from '../reducers/rootReducer';
import { connect } from 'react-redux';
import { IActiveReduxState } from '../reducers/active';

interface ISocketHandlerProps {
  profile: IProfileReduxState;
  room: IRoomReduxState;
  active: IActiveReduxState;
}

const mapStateToProps = ({ profile, room, active }: IReduxState) => ({ profile, room, active });

export class SocketHandler extends React.Component<ISocketHandlerProps> {
  componentDidMount() {
    this.initListeners();
  }
  initListeners = () => {
    const { id: roomId } = this.props.active;

    const ioInstance = getSocketInstance().getIOInstance();
    console.log('init socket...', this.props);
    ioInstance.on(roomId, (message: ISocketMessage) => {
      if (message.type === BROADCAST_MASTER_SELECTION_REQUEST && this.props.room.master !== this.props.profile._id) {
        ioInstance.emit(JSON.stringify({ type: REQUEST_TO_BE_MASTER, roomId }), {
          receiverId: 'Node',
          message: {
            type: REQUEST_TO_BE_MASTER,
            payload: {
              userId: this.props.profile._id,
            },
          },
        });
      } else if (message.type === CHECK_MASTER_IS_ONLINE) {
        console.log(message);
        ioInstance.emit(JSON.stringify({ type: ACK_MASTER_IS_ONLINE, roomId }), {
          receiverId: 'Node',
          message: {
            type: ACK_MASTER_IS_ONLINE,
            payload: {
              userId: this.props.profile._id,
              roomId,
            },
          },
        });
      }
    });
  };

  componentDidUpdate(prevProps: Readonly<ISocketHandlerProps>) {
    const { id: roomId } = this.props.active;
    const { id: prevRoomId } = prevProps.active;

    if (prevRoomId !== roomId) {
      this.initListeners();
    }
  }

  render() {
    return <React.Fragment />;
  }
}

export default connect(mapStateToProps)(SocketHandler);
