import { OAuth2Client } from 'google-auth-library';
import config from '../config';

export async function getUserDataFromToken(token: string) {
  const googleClient = new OAuth2Client(config.googleAuth.googleClientId, '', '');

  return new Promise((resolve, reject) => {
    if (!token) {
      throw new Error('Token missing');
    }
    googleClient
      .verifyIdToken({ idToken: token, audience: config.googleAuth.googleClientId})
      .then((login: any) => {
        const payload = login.getPayload();
        if(payload['aud'] === config.googleAuth.googleClientId) {
          resolve({
            userId: payload.sub,
            email: payload.email,
            name: payload.name
          });
        } else {
          throw new Error('Invalid google client Id');
        }
      })
      .catch((error) => reject(error));
  });
}
