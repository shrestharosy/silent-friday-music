import axios from 'axios';
import * as jwtServices from '../utils/jwt';
import * as userServices from './user';

interface IUserPayload {
  userId: string;
  name: string;
  email: string;
  image: string;
}

interface IGoogleData {
  id: string;
  displayName: string;
  emails: Array<{ value: string }>;
  image: { url: string };
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
    const user = await checkIfUserExists(userGoogleData);

    if (user) {
    }
    const tokenData = { id: user._id };
    const accessToken = jwtServices.generateAccessToken(tokenData);
    const refreshToken = jwtServices.generateRefreshToken(tokenData);

    const authData = {
      accessToken,
      refreshToken,
    };

    return authData;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function checkIfUserExists(userGoogleData: IGoogleData) {
  try {
    let googleUser = await userServices.getUserByGoogleId(userGoogleData.id);
    let modifiedGoogleUser: userServices.IUser;
    if (googleUser === null) {
      const newUser = {
        name: userGoogleData.displayName,
        email: userGoogleData.emails[0].value,
        userId: userGoogleData.id,
        image: userGoogleData.image.url,
      };
      modifiedGoogleUser = await userServices.createUser(newUser);
      return modifiedGoogleUser;
    } else {
      return googleUser;
    }
  } catch (error) {
    throw error;
  }
}

export async function refreshExpiredToken(refreshToken: string) {
  try {
    const decodedToken = await jwtServices.decodeToken(refreshToken);
    const newAccessToken = await jwtServices.generateAccessToken(decodedToken);
    return newAccessToken;
  } catch (error) {
    throw error;
  }
}
