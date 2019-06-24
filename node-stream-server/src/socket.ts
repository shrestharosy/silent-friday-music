import getSocketInstance from './services/socket';
import { BROADCAST_SONG_TIMESTAMP } from '../../extension/src/constants/socket';

interface ISocketRequest {
  receiverId: string;
  message: Object;
}

export default function initializeSockerListeners() {
  const socketInstance = getSocketInstance();

  socketInstance.getIOInstance().on('connect', socket => {
    console.log('User connected..', socket.id);
    socket.on(JSON.stringify({ type: BROADCAST_SONG_TIMESTAMP }), (request: ISocketRequest) => {
      console.log(request, BROADCAST_SONG_TIMESTAMP);
      socketInstance.getIOInstance().emit(request.receiverId, request.message);
    });
  });
}
