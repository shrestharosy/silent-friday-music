import app from './app';
import mongoose from 'mongoose';
import config from './config';
import getSocketInstance from './services/socket';
import initializeSockerListeners from './socket';

const { dbUrl } = config.mongo;
mongoose.connect(`${dbUrl}?authSource=admin`, {
  useNewUrlParser: true,
  useFindAndModify: false,
  user: config.mongo.mongoUsername,
  pass: config.mongo.mongoPassword,
});
const db = mongoose.connection;

db.once('open', () => {
  console.log(`Connected to DB ${dbUrl}`);
});

db.on('error', (error: any) => {
  console.log(error);
});

const server = app.listen(3002, () => {
  console.log('Server is running..');
  try {
    getSocketInstance(server);
    initializeSockerListeners();
  } catch (error) {
    throw error;
  }
});
