import { Router } from 'express';
import ytdl from 'ytdl-core';
import FfmpegCommand from 'fluent-ffmpeg';

const streamRouter = Router();

streamRouter.get('/', (req, res) => {
  const requestLink: string = req.query.v;
  try {
    const youtubeStream = ytdl(requestLink, { filter: 'audioonly' });
    res.set({
      'Content-Type': 'audio/mpeg',
    });
    const ffmpegCommand = FfmpegCommand(youtubeStream);
    // console.log(outputstream)
    // outputstream.pipe(res);
    // console.log(outputstream)
    process.nextTick(() => {
      console.log('next tick....');
      const outputstream = ffmpegCommand
        .seekInput(60)
        .format('mp3')
        .pipe();
      outputstream.on('data', data => {
        console.log('data', data);
      });
      outputstream.on('error', error => {
        console.log(error);
      });
      outputstream.pipe(res);
    });
    // youtubeStream.on('data', (data) => {
    //   console.log('yldl-data', data);
    // })
  } catch (error) {}
});

export default streamRouter;
