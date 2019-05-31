import { OAuth2Client } from 'google-auth-library';
import config from '../config';
import { IUser } from './user';

interface IUserPayload {
  userId: string;
  name: string;
  email: string;
  image: string;
}


export async function getUserDataFromToken(token: string) {
  try {
    const googleClient = new OAuth2Client(config.googleAuth.googleClientId, '', '');
    const checkUser = await new Promise<IUserPayload>((resolve, reject) => {
      googleClient.verifyIdToken({ 
        idToken: token, audience: config.googleAuth.googleClientId
      }, (error: Object|null, login: any ) => {
        const payload = login.getPayload();
        if(payload['aud'] === config.googleAuth.googleClientId) {
          resolve({
            userId: payload.sub,
            name: payload.name,
            email: payload.email,
            image: payload.imageUrl
          });
        } else {
          reject(error);
          // throw new Error('Invalid google client Id');
        }
      });
    });
    return checkUser;
  } catch (error) {
    throw error;
  }
}