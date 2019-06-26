import getSocketInstance from './services/socket';
import { BROADCAST_SONG_TIMESTAMP, REQUEST_TO_BE_MASTER } from '../../extension/src/constants/socket';
import { getUserIdFromAuthHeader } from './utils/auth';

export interface ISocketRequest {
  receiverId: string;
  message: Object;
}

interface ICustomSocket extends SocketIO.Socket {
  auth?: {
    userId: string;
  };
}

const ConnectedSocketHash: { [id: string]: string } = {};

export function getSocketIds(userIds: Array<string>) {
  let socketIds: Array<string> = [];
  userIds.forEach(userId => {
    if (ConnectedSocketHash[userId]) {
      socketIds.push(ConnectedSocketHash[userId]);
    }
  });
  return socketIds;
}

export default function initializeSockerListeners() {
  const socketInstance = getSocketInstance();

  socketInstance.getIOInstance().use(function(socket: ICustomSocket, next) {
    try {
      const id = getUserIdFromAuthHeader(socket.handshake.query.authorization);
      if (id) {
        socket.auth = { userId: id };
        next();
      } else {
        throw new Error('Token is invalid');
      }
    } catch (error) {
      next(new Error('Unauthorized socket connection'));
    }
  });

  socketInstance.getIOInstance().on('connect', (socket: ICustomSocket) => {
    console.log('User connected..', socket.id, socket.auth);

    if (socket.auth) {
      ConnectedSocketHash[socket.auth.userId] = socket.id;
    }

    socket.on(JSON.stringify({ type: BROADCAST_SONG_TIMESTAMP }), (request: ISocketRequest) => {
      console.log(request, BROADCAST_SONG_TIMESTAMP);
      socketInstance.getIOInstance().emit(request.receiverId, request.message);
    });
  });
}
