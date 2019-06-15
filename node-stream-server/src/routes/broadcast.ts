import { Router } from 'express';
import ytdl from 'ytdl-core';

const broadcastRouter = Router();

broadcastRouter.post('/', async (req, res) => {
  const {
    body: { requestUrl },
  } = req;
  try {
    const basicInfo = await ytdl.getBasicInfo(requestUrl);
    const {
      author: { avatar, name },
      title,
      player_response: {
        videoDetails: { videoId },
      },
    } = basicInfo;
    res.status(200).send({
      avatar,
      channelName: name,
      title,
      thumbnailUrl: `https://i1.ytimg.com/vi/${videoId}/hqdefault.jpg`,
      streamUrl: `http://localhost:3002/stream?v=${requestUrl}`,
    });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

export default broadcastRouter;
