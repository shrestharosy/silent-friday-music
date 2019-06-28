import { Router } from 'express';

import { getAllUsers, getUserById, getUserByGoogleId, createUser, userService, searchUser } from '../services/user';

import { IVerifiedRequest } from '../middlewares/verifyToken';
import validationMiddleware from '../middlewares/validation';
import { createUserSchema } from '../validationSchema/user';
import responseMiddleware, { IResponseRequest } from '../middlewares/response';

const userRouter = Router();

const userValidationMiddleware = validationMiddleware(createUserSchema);

userRouter.get(
  '/',
  async (req: IResponseRequest, res, next) => {
    try {
      const data = await getAllUsers();
      req.response = {
        payload: data,
      };
      next();
    } catch (error) {
      next(error.message);
    }
  },
  responseMiddleware
);

userRouter.get(
  '/me',
  async (req: IVerifiedRequest & IResponseRequest, res, next) => {
    try {
      const { auth = { userId: '' } } = req;
      const userProfile = await userService.getUserById(auth.userId);

      req.response = {
        payload: userProfile,
      };

      next();
    } catch (error) {
      next(error.message);
    }
  },
  responseMiddleware
);

userRouter.get(
  '/:id',
  async (req: IResponseRequest, res, next) => {
    try {
      const data = await getUserById(req.params.id);
      req.response = {
        payload: data,
      };
      next();
    } catch (error) {
      next(error.message);
    }
  },
  responseMiddleware
);

userRouter.get(
  '/google/:gid',
  async (req: IResponseRequest, res, next) => {
    try {
      const data = await getUserByGoogleId(req.params.gid);
      req.response = {
        payload: data,
      };
      next();
    } catch (error) {
      next(error.message);
    }
  },
  responseMiddleware
);

userRouter.post('/', userValidationMiddleware, async (req: IResponseRequest, res, next) => {
  try {
    const data = await createUser(req.body);
    req.response = {
      payload: data,
    };
    next();
  } catch (error) {
    next({
      status: 500,
      message: error.message,
    });
  }
});

userRouter.get(
  '/find/:searchTerm',
  async (req: IResponseRequest, res, next) => {
    try {
      const data = await searchUser(req.params.searchTerm);
      req.response = {
        payload: data,
      };
      next();
    } catch (error) {
      next(error.message);
    }
  },
  responseMiddleware
);

export default userRouter;
