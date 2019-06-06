import { Router } from 'express';

import { getAllUsers, getUserById, getUserByGoogleId, createUser, userService } from '../services/user';
import * as jwtServices from '../utils/jwt';
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
  const header = req.headers.authorization;
  if (header) {
    const id = authServices.getUserIdFromAuthHeader(header);
    if (id) {
      try {
        const userProfile = await userService.getUserById(id);
        res.json(userProfile);
      } catch (error) {
        res.json({ message: error });
      }
    }
  }
});

userRouter.get('/user/:id', async (req, res) => {
  try {
    const data = await getUserById(req.params.id);
    res.json(data);
  } catch (error) {
    res.json({ message: error });
  }
});

userRouter.get('/user/google/:gid', async (req, res) => {
  try {
    const data = await getUserByGoogleId(req.params.gid);
    res.json(data);
  } catch (error) {
    res.json({ message: error });
  }
});

userRouter.post('/user', async (req, res, next) => {
  try {
    const data = await createUser(req.body);
    res.json(data);
  } catch (error) {
    res.json({ message: error });
  }
});

// TODO:
// - Update user route
// -

export default userRouter;