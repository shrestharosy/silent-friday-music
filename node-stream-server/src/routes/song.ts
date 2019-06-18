import { Router } from 'express';

import * as songControllers from '../controllers/song';

const songsRouter = Router();

songsRouter.get('/:songId', songControllers.getSongDetails);

export default songsRouter;
