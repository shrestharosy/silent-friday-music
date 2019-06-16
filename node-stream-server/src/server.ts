import app from './app';
import mongoose from 'mongoose';
import config from './config';
import getSocketInstance from './services/socket';

const { dbUrl } = config.mongo;
mongoose.connect(dbUrl, { useNewUrlParser: true, useFindAndModify: false });
const db = mongoose.connection;

db.once('open', () => {
  console.log(`Connected to DB ${dbUrl}`);
});

db.on('error', (error: any) => {
  console.log(error);
});

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
