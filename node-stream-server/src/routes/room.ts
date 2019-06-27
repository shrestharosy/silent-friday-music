import { Router } from 'express';

import * as roomServices from '../services/room';
import * as songControllers from '../controllers/song';
import { IVerifiedRequest } from '../middlewares/verifyToken';
import validationMiddleware from '../middlewares/validation';
import { createRoomSchema } from '../validationSchema/room';
import responseMiddleware, { IResponseRequest } from '../middlewares/response';

const roomsRouter = Router();

const roomValidationMiddleware = validationMiddleware(createRoomSchema);

roomsRouter.get(
  '/',
  async (req: IVerifiedRequest & IResponseRequest, res, next) => {
    try {
      const { query } = req;
      const { auth = { userId: '' } } = req;
      const roomList = await roomServices.getAllRooms({
        ...query,
        userId: auth.userId,
      });

      req.response = {
        payload: roomList,
      };
      next();
    } catch (error) {
      next({
        error: {
          status: 500,
          message: error,
        },
      });
    }
  },
  responseMiddleware
);

roomsRouter.get(
  '/:roomId',
  async (req: IResponseRequest, res, next) => {
    try {
      const {
        params: { roomId },
      } = req;

      const roomWithGivenId = await roomServices.getRoomById(roomId);

      roomServices.isMasterActiveInRoom(roomWithGivenId);

      req.response = {
        payload: roomWithGivenId,
      };

      next();
    } catch (error) {
      next({
        error: {
          status: 500,
          message: error,
        },
      });
    }
  },
  responseMiddleware
);

roomsRouter.post(
  '/',
  roomValidationMiddleware,
  async (req: IVerifiedRequest & IResponseRequest, res, next) => {
    try {
      const { body } = req;
      const { auth = { userId: '' } } = req;
      const createdRoom = await roomServices.createRoom({
        ...body,
        master: auth.userId,
        members: [...body.members, auth.userId],
      });

      req.response = {
        payload: createdRoom,
      };
      next();
    } catch (error) {
      next({
        error: {
          status: 500,
          error: error,
        },
      });
    }
  },
  responseMiddleware
);

roomsRouter.put(
  '/:roomId',
  async (req: IResponseRequest, res, next) => {
    try {
      const roomUpdate = req.body;
      const roomId = req.params.roomId;
      const updatedRoom = await roomServices.updateRoom(roomId, roomUpdate);

      req.response = {
        payload: updatedRoom,
      };
      next();
    } catch (error) {
      next({
        error: {
          status: 500,
          message: error,
        },
      });
    }
  },
  responseMiddleware
);

roomsRouter.patch(
  '/:roomId',
  async (req: IResponseRequest, res, next) => {
    try {
      const roomUpdate = req.body;
      const roomId = req.params.roomId;
      const updatedRoom = await roomServices.updateRoom(roomId, roomUpdate);

      req.response = {
        payload: updatedRoom,
      };

      next();
    } catch (error) {
      next({
        error: {
          status: 500,
          message: error,
        },
      });
    }
  },
  responseMiddleware
);

roomsRouter.patch(
  '/:roomId/removeSong',
  async (req: IResponseRequest, res, next) => {
    try {
      const roomId = req.params.roomId;
      const songId = req.body.songId;
      const updatedRoom = await roomServices.deleteCompletedSong(roomId, songId);

      req.response = {
        payload: updatedRoom,
      };
      next();
    } catch (error) {
      next({
        error: {
          status: 500,
          message: error,
        },
      });
    }
  },
  responseMiddleware
);

roomsRouter.post(
  '/:roomId/songs',
  async (req: IResponseRequest, res, next) => {
    const roomId = req.params.roomId;
    const { url } = req.body;
    try {
      const updatedPlaylist = await songControllers.addToPlaylist({
        roomId,
        url,
      });

      req.response = {
        payload: updatedPlaylist,
      };

      next();
    } catch (error) {
      next({
        error: {
          status: 500,
          message: error,
        },
      });
    }
  },
  responseMiddleware
);

roomsRouter.get(
  '/:roomId/songs',
  async (req: IResponseRequest, res, next) => {
    const roomId = req.params.roomId;
    try {
      const playlist = await songControllers.getPlaylist({ roomId });
      req.response = {
        payload: playlist,
      };
      next();
    } catch (error) {
      next({
        error: {
          status: 500,
          message: error,
        },
      });
    }
  },
  responseMiddleware
);

roomsRouter.get(
  '/:roomId/leave',
  async (req: IResponseRequest, res, next) => {
    const roomId = req.params.roomId;
    roomServices.selectMaster(roomId);

    next();
  },
  responseMiddleware
);

export default roomsRouter;
