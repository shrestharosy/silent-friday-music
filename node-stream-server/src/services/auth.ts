import axios from 'axios';
import * as jwtServices from '../utils/jwt';

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
    console.error(error);
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
