import { Router } from 'express';
import * as authServices from '../services/auth';
import * as jwtServices from '../utils/jwt';
import { createUser, getUserById, getAllUsers, getUserByGoogleId } from '../services/user';

const authRouter = Router();
 
authRouter.post('/login', async (req, res, next) => {
  try {
    if(!req.body.token) {
      res.send('Token missing');
      throw new Error('Token missing');
    }

    const userData = await authServices.getUserDataFromToken(req.body.token);
    const accessToken = jwtServices.generateAccessToken(userData);
    const refreshToken = jwtServices.generateRefreshToken(userData);
    
    // TODO: check if user exists in DB 
    // TODO: create new user if user does not exist

    const response = {
      accessToken,
      refreshToken,
      // TODO: return user data from DB along with the tokens in response
    }
    res.send(response);
  } catch (error) {
    throw new Error(error);
  } 
});

authRouter.post('/logout', (req, res, next) => {
  res.send('logout');
});

authRouter.post('/refresh-token', (req, res, next) => {
  res.send('Refresh Token');
});

export default authRouter;