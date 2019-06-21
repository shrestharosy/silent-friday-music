import { Router } from 'express';
import ytdl from 'ytdl-core';

const streamRouter = Router();

streamRouter.get('/', (req, res) => {
  const requestLink: string = req.query.v;
  const startTimestamp: string = req.query.t;
  console.log(requestLink, startTimestamp, req.query);
  try {
    const youtubeStream = ytdl(requestLink, { filter: 'audioonly', begin: `${startTimestamp}ms  ` });
    res.set({
      'Content-Type': 'audio/mpeg',
    });
    youtubeStream.pipe(res);
  } catch (error) {
    console.log(error);
  }
});

export default streamRouter;
