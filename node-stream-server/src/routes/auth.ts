import { Router } from 'express';
import * as authServices from '../services/auth';
import verifyToken from '../middlewares/verifyToken';

const authRouter = Router();

authRouter.post('/login', async (req, res) => {
  try {
    if (!req.body.token) {
      res.status(500).json({
        message: 'Token missing',
      });
    }

    const authData = await authServices.loginUser(req.body.token);

    res.status(200).json({
      ...authData,
      message: 'Sucessfully logged in!',
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});

authRouter.post('/logout', (req, res) => {
  res.send('clear local storage and blacklist the tokens until expired');
});

authRouter.post('/refresh-token', async (req, res) => {
  try {
    const newToken = await authServices.refreshExpiredToken(req.body.refreshToken);
    return res.json(newToken);
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});

authRouter.get('/unauthorized', (req, res) => {
  res.status(403).send({ message: 'Unauthorized access' });
});

authRouter.get('/test', verifyToken, (req, res) => {
  res.send(req.body.auth);
});

export default authRouter;
