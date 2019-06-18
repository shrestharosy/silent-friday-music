import { Request, Response } from 'express';

import * as songServices from '../services/song';

export async function addToPlaylist(req: Request, res: Response) {
  try {
    const roomId = req.params.roomId;
    const { url } = req.body;
    const updatedPlayList = await songServices.addToPlaylist(roomId, url);
    res.json(updatedPlayList);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
}

export async function getPlaylist(req: Request, res: Response) {
  try {
    const roomId = req.params.roomId;
    const playList = await songServices.getPlaylist(roomId);
    res.json(playList);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
}

export async function getSongDetails(req: Request, res: Response) {
  try {
    const songId = req.params.songId;
    const songDetails = await songServices.getSongById(songId);
    res.json(songDetails);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
}
