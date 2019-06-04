import { Router } from 'express';
import * as authServices from '../services/auth';
import * as jwtServices from '../utils/jwt';
import * as userServices from '../services/user';

const authRouter = Router();
 
authRouter.post('/login', async (req, res, next) => {
  try {
    if(!req.body.token) {
      res.send('Token missing');
      throw new Error('Token missing');
    }
    // Fetching user data from token
    const userGoogleData = await authServices.getUserDataFromToken(req.body.token);
    // Checking if user exists in DB
    let user = await userServices.getUserByGoogleId(userGoogleData.userId);
    // Creating new user if user does not exist
    if(user === null) {
      const newUser = {
        name: userGoogleData.name,
        email: userGoogleData.email,
        userId: userGoogleData.userId,
        image: userGoogleData.image
      }
      user = await userServices.createUser(newUser);    
    }

    // Generating Access and Refresh Tokens
    const tokenData = { id: user._id };
    const accessToken = jwtServices.generateAccessToken(tokenData);
    const refreshToken = jwtServices.generateRefreshToken(tokenData);
  
    const response = {
      accessToken,
      refreshToken,
      name: user.name,
      email: user.email,
      image: user.image,
      id: user._id
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