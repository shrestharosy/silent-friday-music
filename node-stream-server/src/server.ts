import app from './app';
import mongoose from 'mongoose';
import config from './config';
import getSocketInstance from './services/socket';
import initializeSockerListeners from './socket';
import * as log from 'winston-logger-setup';

const { dbUrl } = config.mongo;
mongoose.connect(`${dbUrl}`, {
  useNewUrlParser: true,
  useFindAndModify: false,
  user: config.mongo.mongoUsername,
  pass: config.mongo.mongoPassword,
});
const db = mongoose.connection;

db.once('open', () => {
  log.info(`Connected to DB ${dbUrl}`);
});

db.on('error', (error: any) => {
  log.error(error);
  throw error;
});

const server = app.listen(3002, () => {
  log.info('Server is running..');
  try {
    getSocketInstance(server);
    initializeSockerListeners();
  } catch (error) {
    throw error;
  }
});
