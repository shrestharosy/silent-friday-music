import { Router } from 'express';

import * as songServices from '../services/song';

const songsRouter = Router();

songsRouter.post('/', async (req, res) => {
  try {
    const roomId = req.params.roomId;
    const { url } = req.body;
    const newSong = await songServices.addToPlaylist(roomId, url);
    res.json(newSong);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
});

export default songsRouter;
