import { Router } from 'express';
import * as authServices from '../services/auth';
import * as jwtServices from '../utils/jwt';
import * as userServices from '../services/user';
import verifyToken from '../middlewares/verifyToken';

const authRouter = Router();

authRouter.post('/login', async (req, res) => {
  try {
    let message = "";
    if(!req.body.token) {
      res.send('Token missing');
      throw new Error('Token missing');
    }

    // Fetching user's google data from access token
    const userGoogleData = await authServices.getUserData(req.body.token);

    // Checking if user exists in DB
    let user = await userServices.getUserByGoogleId(userGoogleData.id);

    // Creating new user if user does not exist
    if (user === null) {
      const newUser = {
        name: userGoogleData.displayName,
        email: userGoogleData.emails[0].value,
        userId: userGoogleData.id,
        image: userGoogleData.image.url
      }
      message = "Created new user and logged in";
      user = await userServices.createUser(newUser);    
    } else {
      message = "User logged in";
    }

    // Generating Access and Refresh Tokens
    const tokenData = { id: user._id };
    const accessToken = jwtServices.generateAccessToken(tokenData);
    const refreshToken = jwtServices.generateRefreshToken(tokenData);
    
    // Sending tokens as response which will be stored in user localstorage
    const response = { 
      accessToken,
      refreshToken
    }

    res.status(200).json({
      data: response,
      message
    });

  } catch (error) {
    res.status(500).json({
      message: error
    });
  } 
});

authRouter.post('/logout', (req, res, next) => {
  res.send('clear local storage and blacklist the tokens until expired');
});

authRouter.post('/refresh-token', async (req, res) => {
  try {
    const newToken = await authServices.refreshExpiredToken(req.body.refreshToken);
    return res.json(newToken);
  } catch (error) {
    res.status(500).json({ 
      message: error
    });
  }
});

authRouter.get('/unauthorized', (req, res) => {
  res.status(403).send({ message: "Unauthorized access" });
});

authRouter.get('/test', verifyToken, (req, res) => {
  res.send(req.body.auth);
});


export default authRouter;
