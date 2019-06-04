import { Router } from 'express';
import * as roomServices from '../services/room';

const roomsRouter = Router();

roomsRouter.get('/', async (req, res) => {
  try {
    const roomList = await roomServices.getAllRooms();
    res.json(roomList);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
});

roomsRouter.post('/', async (req, res) => {
  try {
    const createdRoom = await roomServices.createRoom();
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
