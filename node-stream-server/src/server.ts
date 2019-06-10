import app from './app';
import mongoose from 'mongoose';
import config from './config';

const { dbUrl } = config.mongo;
mongoose.connect(dbUrl, { useNewUrlParser: true, useFindAndModify: false });
const db = mongoose.connection;

db.once('open', () => {
  console.log(`Connected to DB ${dbUrl}`);
});

db.on('error', (error: any) => {
  console.log(error);
});

app.listen(3002, () => {
  console.log('Server is running..');
});
