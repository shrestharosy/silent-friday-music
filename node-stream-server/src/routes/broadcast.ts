import { Router } from 'express';

import { getSongDetails } from '../services/song';

const broadcastRouter = Router();

broadcastRouter.post('/', async (req, res) => {
  const {
    body: { requestUrl },
  } = req;
  try {
    const basicInfo = await getSongDetails(requestUrl);
    res.status(200).send(basicInfo);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

export default broadcastRouter;
