import { Router } from 'express';
import ytdl from 'ytdl-core';
import FfmpegCommand from 'fluent-ffmpeg';

const streamRouter = Router();

streamRouter.get('/', (req, res) => {
  try {
    const requestLink: string = req.query.v;
    const startTimestamp: string = req.query.t;

    console.log(requestLink, req.query, startTimestamp, 'stream router');

    const youtubeStream = ytdl(requestLink, { filter: 'audioonly' });

    res.set({
      'Content-Type': 'audio/mpeg',
    });

    if (startTimestamp) {
      const ffmpegCommand = FfmpegCommand(youtubeStream);

      process.nextTick(() => {
        const outputStream = ffmpegCommand
          .seekInput(startTimestamp)
          .format('mp3')
          .pipe();
        outputStream.on('error', error => {
          throw new Error('Issue with ffmpeg');
        });

        outputStream.pipe(res);
      });
    } else {
      youtubeStream.pipe(res);
    }
  } catch (error) {
    console.log(error);
  }
});

export default streamRouter;
