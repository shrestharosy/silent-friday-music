import getSocketInstance from './services/socket';
import { BROADCAST_SONG_TIMESTAMP } from '../../extension/src/constants/socket';

export default function initializeSockerListeners() {
  const socketInstance = getSocketInstance();

  socketInstance.getIOInstance().on('connect', socket => {
    console.log('User connected..', socket.id);
    socket.on(JSON.stringify({ type: BROADCAST_SONG_TIMESTAMP }), (message: Object) => {
      console.log(message);
    });
  });
}
