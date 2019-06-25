import { Router } from 'express';

import * as roomServices from '../services/room';
import * as songControllers from '../controllers/song';
import { IVerifiedRequest } from '../middlewares/verifyToken';
import getSocketInstance from '../services/socket';
import { BROADCAST_MASTER_SELECTION_REQUEST, REQUEST_TO_BE_MASTER } from '../../../extension/src/constants/socket';
import { ISocketRequest, getSocketIds } from '../socket';

const roomsRouter = Router();

roomsRouter.get('/', async (req: IVerifiedRequest, res) => {
  try {
    const { query } = req;
    const { auth = { userId: '' } } = req;

    const roomList = await roomServices.getAllRooms({ ...query, userId: auth.userId });

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

    res.json(roomWithGivenId);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
});

roomsRouter.post('/', async (req, res) => {
  try {
    const { body } = req;

    const createdRoom = await roomServices.createRoom(body);
    res.json(createdRoom);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
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

roomsRouter.post('/:roomId/leave', async (req, res) => {
  const roomId = req.params.roomId;
  console.log(roomId, 'leave');
  try {
    const { members } = await roomServices.getRoomById(roomId);

    const ioInstance = getSocketInstance().getIOInstance();

    ioInstance.emit(roomId, { type: BROADCAST_MASTER_SELECTION_REQUEST });

    const socketIds = getSocketIds(members);

    const activeSockets = ioInstance.sockets.sockets;

    const potentialMasterIds: Array<string> = [];

    console.log(JSON.stringify({ type: REQUEST_TO_BE_MASTER, roomId }));

    const masterRequestCallBack = async (request: ISocketRequest) => {
      const {
        payload: { userId },
      } = request.message as { payload: { userId: string } };
      console.log(potentialMasterIds, 'ppotentialMasters', request);
      potentialMasterIds.push(userId);
      if (potentialMasterIds.length === 1) {
        try {
          await roomServices.updateRoom(roomId, { master: userId });
        } catch (error) {
          throw error;
        }
      }
    };

    socketIds.map(socketId => {
      const activeSocket = activeSockets[socketId];
      activeSockets[socketId].once(JSON.stringify({ type: REQUEST_TO_BE_MASTER, roomId }), masterRequestCallBack);
    });
  } catch (error) {
    console.log(error);
  }
});

export default roomsRouter;
