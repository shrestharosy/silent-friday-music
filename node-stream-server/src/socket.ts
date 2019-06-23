import getSocketInstance from './services/socket';
import { BROADCAST_SONG_TIMESTAMP } from '../../extension/src/constants/socket';
import { getUserIdFromAuthHeader } from './utils/auth';

interface ISocketRequest {
  receiverId: string;
  message: Object;
}

export default function initializeSockerListeners() {
  const socketInstance = getSocketInstance();

  socketInstance.getIOInstance().use(function(socket, next) {
    try {
      const id = getUserIdFromAuthHeader(socket.handshake.query.authorization);
      if (id) {
        next();
      } else {
        throw new Error('Token is invalid');
      }
    } catch (error) {
      next(new Error('Unauthorized socket connection'));
    }
  });

  socketInstance.getIOInstance().on('connect', socket => {
    console.log('User connected..', socket.id);
    socket.on(JSON.stringify({ type: BROADCAST_SONG_TIMESTAMP }), (request: ISocketRequest) => {
      console.log(request, BROADCAST_SONG_TIMESTAMP);
      socketInstance.getIOInstance().emit(request.receiverId, request.message);
    });
  });
}
