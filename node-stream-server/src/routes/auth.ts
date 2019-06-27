import { Router } from 'express';
import * as authServices from '../services/auth';
import verifyToken from '../middlewares/verifyToken';
import responseMiddleware, { IResponseRequest } from '../middlewares/response';

const authRouter = Router();

authRouter.post(
  '/login',
  async (req: IResponseRequest, res, next) => {
    try {
      if (!req.body.token) {
        next({
          error: {
            status: 400,
            message: 'Token is missing',
          },
        });
      }

      const authData = await authServices.loginUser(req.body.token);

      req.response = {
        payload: {
          ...authData,
          message: 'Successfully logged in!',
        },
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

authRouter.post('/logout', (req, res, next) => {
  next();
});

authRouter.post(
  '/refresh-token',
  async (req: IResponseRequest, res, next) => {
    try {
      const newToken = await authServices.refreshExpiredToken(req.body.refreshToken);
      req.response = {
        payload: {
          accessToken: newToken,
        },
      };
      next();
    } catch (error) {
      next({
        status: 500,
        message: error,
      });
    }
  },
  responseMiddleware
);

authRouter.get('/unauthorized', (req, res) => {
  res.status(403).send({ message: 'Unauthorized access' });
});

authRouter.get('/test', verifyToken, (req, res) => {
  res.send(req.body.auth);
});

export default authRouter;
