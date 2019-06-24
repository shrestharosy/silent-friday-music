import express from 'express';
import bodyParser from 'body-parser';

import broadcastRouter from './routes/broadcast';
import streamRouter from './routes/stream';
import authRouter from './routes/auth';
import userRouter from './routes/user';
import roomsRouter from './routes/room';
import songsRouter from './routes/song';
import verifyToken from './middlewares/verifyToken';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE, PATCH');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.get('/', (req, res) => {
  res.send('This is test');
});

app.use('/auth', authRouter);
app.use('/broadcast', verifyToken, broadcastRouter);
app.use('/stream', verifyToken, streamRouter);
app.use('/users', verifyToken, userRouter);
app.use('/rooms', verifyToken, roomsRouter);
app.use('/songs', verifyToken, songsRouter);

export default app;
