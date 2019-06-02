import app from './app';
import getSocketInstance from './services/socket';

const server = app.listen(3002, () => {
  console.log('Server is running..');
  const socketInstance = getSocketInstance(server);
  socketInstance.getIOInstance().on('connect', socket => {
    console.log('User connected..', socket.id);
    socket.on('time-update', (message: Object) => {
      console.log(message);
      // socket.emit('broadcast-time-update', message);
      socketInstance.getIOInstance().emit('broadcast-time-update', message);
    });
  });
});
