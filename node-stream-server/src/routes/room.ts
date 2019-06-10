import { Router } from 'express';
import * as roomServices from '../services/room';

const roomsRouter = Router();

roomsRouter.get('/', async (req, res) => {
  try {
    const { query } = req;

    const roomList = await roomServices.getAllRooms(query);

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

export default roomsRouter;
