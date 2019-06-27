import { Router } from 'express';

import * as songControllers from '../controllers/song';
import responseMiddleware, { IResponseRequest } from '../middlewares/response';

const songsRouter = Router();

songsRouter.get(
  '/:songId',
  async (req: IResponseRequest, res, next) => {
    const songId = req.params.songId;
    try {
      const songDetails = await songControllers.getSongDetails({
        songId,
      });
      req.response = {
        payload: songDetails ? songDetails : {},
      };
      next();
    } catch (error) {
      next(error.message);
    }
  },
  responseMiddleware
);

export default songsRouter;
