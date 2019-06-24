import { Router } from 'express';

import { getAllUsers, getUserById, getUserByGoogleId, createUser, userService, searchUser } from '../services/user';
import * as authServices from '../utils/auth';

const userRouter = Router();

userRouter.get('/', async (req, res) => {
  try {
    const data = await getAllUsers();
    res.json(data);
  } catch (error) {
    res.json({ message: error });
  }
});

userRouter.get('/me', async (req, res) => {
  try {
    const header = req.headers.authorization;
    if (header) {
      const id = authServices.getUserIdFromAuthHeader(header);
      if (id) {
        const userProfile = await userService.getUserById(id);
        res.json(userProfile);
      } else {
        throw new Error('Token invalid');
      }
    } else {
      throw new Error('Authorization header required');
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

userRouter.get('/:id', async (req, res) => {
  try {
    const data = await getUserById(req.params.id);
    res.json(data);
  } catch (error) {
    res.json({ message: error });
  }
});

userRouter.get('/google/:gid', async (req, res) => {
  try {
    const data = await getUserByGoogleId(req.params.gid);
    res.json(data);
  } catch (error) {
    res.json({ message: error });
  }
});

userRouter.post('/', async (req, res) => {
  try {
    const data = await createUser(req.body);
    res.json(data);
  } catch (error) {
    res.json({ message: error });
  }
});

userRouter.get('/find/:searchTerm', async (req, res) => {
  try {
    const data = await searchUser(req.params.searchTerm);
    res.json(data);
  } catch (error) {
    res.json(error);
  }
});

export default userRouter;
