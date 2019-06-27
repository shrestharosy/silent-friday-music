import { Router } from 'express';

import * as roomServices from '../services/room';
import * as songControllers from '../controllers/song';
import { IVerifiedRequest } from '../middlewares/verifyToken';
import validateCreateRoom from '../middlewares/validation';
import validationMiddleware from '../middlewares/validation';
import { createRoomSchema } from '../validationSchema/room';

const roomsRouter = Router();

const roomValidationMiddleware = validationMiddleware(createRoomSchema);

roomsRouter.get('/', async (req: IVerifiedRequest, res) => {
  try {
    const { query } = req;
    const { auth = { userId: '' } } = req;
    const roomList = await roomServices.getAllRooms({
      ...query,
      userId: auth.userId,
    });

    res.json(roomList);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
});

roomsRouter.get('/:roomId', async (req, res) => {
  try {
    const {
      params: { roomId },
    } = req;

    const roomWithGivenId = await roomServices.getRoomById(roomId);

    roomServices.isMasterActiveInRoom(roomWithGivenId);

    res.json(roomWithGivenId);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
});

roomsRouter.post('/', roomValidationMiddleware, async (req: IVerifiedRequest, res, next) => {
  try {
    const { body } = req;
    const { auth = { userId: '' } } = req;
    const createdRoom = await roomServices.createRoom({
      ...body,
      master: auth.userId,
      members: [...body.members, auth.userId],
    });
    res.json(createdRoom);
  } catch (error) {
    next(error);
    // res.status(500).send({
    //   message: error.message
    // });
  }
});

roomsRouter.put('/:roomId', async (req, res) => {
  try {
    const roomUpdate = req.body;
    const roomId = req.params.roomId;
    const updatedRoom = await roomServices.updateRoom(roomId, roomUpdate);
    res.json(updatedRoom);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
});

roomsRouter.patch('/:roomId', async (req, res) => {
  try {
    const roomUpdate = req.body;
    const roomId = req.params.roomId;
    const updatedRoom = await roomServices.updateRoom(roomId, roomUpdate);
    res.json(updatedRoom);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
});

roomsRouter.patch('/:roomId/removeSong', async (req, res) => {
  try {
    const roomId = req.params.roomId;
    const songId = req.body.songId;
    const updatedRoom = await roomServices.deleteCompletedSong(roomId, songId);
    res.json(updatedRoom);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
});

roomsRouter.post('/:roomId/songs', async (req, res) => {
  const roomId = req.params.roomId;
  const { url } = req.body;
  try {
    const updatedPlaylist = await songControllers.addToPlaylist({
      roomId,
      url,
    });
    res.json(updatedPlaylist);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
});

roomsRouter.get('/:roomId/songs', async (req, res) => {
  const roomId = req.params.roomId;
  try {
    const playlist = await songControllers.getPlaylist({ roomId });
    res.json(playlist);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
});

roomsRouter.get('/:roomId/leave', async (req, res) => {
  const roomId = req.params.roomId;
  roomServices.selectMaster(roomId);
  res.status(200).send();
});

export default roomsRouter;
