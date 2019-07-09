import { Router } from 'express';
import ytdl from 'ytdl-core';
import FfmpegCommand from 'fluent-ffmpeg';
import * as log from 'winston-logger-setup';

const streamRouter = Router();

streamRouter.get('/', (req, res, next) => {
  try {
    const requestLink: string = req.query.v;
    const startTimestamp: string = req.query.t;

    log.cnsl(requestLink, req.query, startTimestamp, 'stream router');

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
    next(error);
  }
});

export default streamRouter;
