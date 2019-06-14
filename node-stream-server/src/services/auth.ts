import axios from 'axios';
import * as jwtServices from '../utils/jwt';
import * as userServices from './user';

interface IUserPayload {
  userId: string;
  name: string;
  email: string;
  image: string;
}

export async function getUserData(token: string) {
  try {
    return await axios
      .get(`https://www.googleapis.com/plus/v1/people/me?access_token=${token}`)
      .then(({ data }) => data)
      .catch(error => error);
  } catch (error) {
    throw error;
  }
}

export async function loginUser(googleToken: string) {
  try {
    const userGoogleData = await getUserData(googleToken);
    let user = await userServices.getUserByGoogleId(userGoogleData.id);
    
    if (user === null) {
      const newUser = {
        name: userGoogleData.displayName,
        email: userGoogleData.emails[0].value,
        userId: userGoogleData.id,
        image: userGoogleData.image.url
      }
      user = await userServices.createUser(newUser);
    }

    const tokenData = { id: user._id };
    const accessToken = jwtServices.generateAccessToken(tokenData);
    const refreshToken = jwtServices.generateRefreshToken(tokenData);
    
    const authData = {
      accessToken,
      refreshToken
    }

    return authData;
  } catch (error) {
    throw error;
  }
}

export async function refreshExpiredToken(refreshToken: string ) {
  try {
    const decodedToken = await jwtServices.decodeToken(refreshToken);
    const newAccessToken = await jwtServices.generateAccessToken({ id: decodedToken});
    return newAccessToken;
  } catch (error) {
    throw error;
  }
}
