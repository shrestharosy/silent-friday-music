import express from 'express';
import ytdl from 'ytdl-core';

const app = express();

app.get('/', (req, res) => {
  res.send('This is test');
});

app.get('/test', (req, res) => {
  try {
    const youtubeStream = ytdl('https://www.youtube.com/watch?v=IHNzOHi8sJs', { filter: 'audioonly' });
    res.set({
      'Content-Type': 'audio/mpeg',
    });
    youtubeStream.pipe(res);
  } catch (error) {}
});

export default app;
