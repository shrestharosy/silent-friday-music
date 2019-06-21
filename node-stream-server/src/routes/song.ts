import { Router } from 'express';

import * as songControllers from '../controllers/song';

const songsRouter = Router();

songsRouter.get('/:songId', async (req, res) => {
  const songId = req.params.songId;
  try {
    const songDetails = await songControllers.getSongDetails({
      songId,
    });
    res.json(songDetails);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
});

export default songsRouter;
