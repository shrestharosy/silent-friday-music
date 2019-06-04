import express from 'express';
import bodyParser from 'body-parser';

import broadcastRouter from './routes/broadcast';
import streamRouter from './routes/stream';
import authRouter from './routes/auth';
import userRouter from './routes/user';
import roomsRouter from './routes/room';

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

app.use('/broadcast', broadcastRouter);
app.use('/stream', streamRouter);
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/rooms', roomsRouter);

export default app;
