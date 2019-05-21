import express from 'express';
import ytdl from 'ytdl-core';

const app = express();

app.get('/', (req, res) => {
  res.send('This is test');
});

app.get('/test', (req, res) => {
  const youtubeStream = ytdl('', { filter: 'audioonly' });
  res.set({
    'Content-Type': 'audio/mpeg',
  });
  youtubeStream.on('data', chunks => {
    console.log(chunks);
  });
  res.send();
});

export default app;
