import { OAuth2Client } from 'google-auth-library';
import config from '../config';

interface IUserPayload {
  userId: string;
  name: string;
  email: string;
  image: string;
}

export async function getUserDataFromToken(token: string) {

  const { googleClientId } = config.googleAuth

  try {
    const googleClient = new OAuth2Client(googleClientId, '', '');
    const checkUser = await new Promise<IUserPayload>((resolve, reject) => {
      googleClient.verifyIdToken({ 
        idToken: token, audience: googleClientId
      }, (error: Object|null, login: any) => {
        if (error) {
          throw new Error('Invalid google client Id');
        }
        const payload = login.getPayload();
        if(payload['aud'] === googleClientId) {
          resolve({
            userId: payload.sub,
            name: payload.name,
            email: payload.email,
            image: payload.imageUrl
          });
        } else {
          reject(error);
        }
      });
    });
    return checkUser;
  } catch (error) {
    throw error;
  }
}