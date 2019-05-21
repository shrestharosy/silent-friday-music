import { Router } from 'express';
import ytdl from 'ytdl-core';

const streamRouter = Router();

streamRouter.get('/', (req, res) => {
  const requestLink: string = req.query.v;
  try {
    const youtubeStream = ytdl(requestLink, { filter: 'audioonly' });
    res.set({
      'Content-Type': 'audio/mpeg',
    });
    youtubeStream.pipe(res);
  } catch (error) {}
});

export default streamRouter;
