import * as React from 'react';
import { IProfileReduxState } from '../reducers/profile';
import getSocketInstance, { ISocketMessage } from 'src/services/socket.service';
import { IRoomReduxState } from '../reducers/room';
import { REQUEST_TO_BE_MASTER, BROADCAST_MASTER_SELECTION_REQUEST } from 'src/constants/socket';
import { IReduxState } from '../reducers/rootReducer';
import { connect } from 'react-redux';

interface ISocketHandlerProps {
  profile: IProfileReduxState;
  room: IRoomReduxState;
}

const mapStateToProps = ({ profile, room }: IReduxState) => ({ profile, room });

export class SocketHandler extends React.Component<ISocketHandlerProps> {
  componentDidUpdate(prevProps: Readonly<ISocketHandlerProps>) {
    const { _id: roomId } = this.props.room;
    const { _id: prevRoomId } = prevProps.room;

    if (prevRoomId !== roomId) {
      const ioInstance = getSocketInstance().getIOInstance();
      console.log('init socket...', this.props);
      ioInstance.on(roomId, (message: ISocketMessage) => {
        if (message.type === BROADCAST_MASTER_SELECTION_REQUEST && this.props.room.master !== this.props.profile._id) {
          console.log(message, JSON.stringify({ type: REQUEST_TO_BE_MASTER, roomId }));
          ioInstance.emit(JSON.stringify({ type: REQUEST_TO_BE_MASTER, roomId }), {
            receiverId: 'Node',
            message: {
              type: REQUEST_TO_BE_MASTER,
              payload: {
                userId: this.props.profile._id,
              },
            },
          });
        }
      });
    }
  }

  render() {
    return <React.Fragment />;
  }
}

export default connect(mapStateToProps)(SocketHandler);
