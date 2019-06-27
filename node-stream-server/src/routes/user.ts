import { Router } from 'express';

import { getAllUsers, getUserById, getUserByGoogleId, createUser, userService, searchUser } from '../services/user';
import * as authServices from '../utils/auth';
import { IVerifiedRequest } from '../middlewares/verifyToken';
import validationMiddleware from '../middlewares/validation';
import { createUserSchema } from '../validationSchema/user';

const userRouter = Router();

const userValidationMiddleware = validationMiddleware(createUserSchema);

userRouter.get('/', async (req, res) => {
  try {
    const data = await getAllUsers();
    res.json(data);
  } catch (error) {
    res.json({ message: error });
  }
});

userRouter.get('/me', async (req: IVerifiedRequest, res) => {
  try {
    const { auth = { userId: '' } } = req;
    const userProfile = await userService.getUserById(auth.userId);

    res.json(userProfile);
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

userRouter.post('/', userValidationMiddleware, async (req, res) => {
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
