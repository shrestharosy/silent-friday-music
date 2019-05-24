import { OAuth2Client } from 'google-auth-library';

export async function getUserDataFromToken(token: string) {
  const googleClient = new OAuth2Client('add googleClientId here', '', '');

  return new Promise((resolve, reject) => {
    if (!token) {
      throw new Error('Token missing');
    }
    googleClient
      .verifyIdToken({ idToken: token, audience: 'add googleClientId here'})
      .then((login: any) => {
        const payload = login.getPayload();
        if(payload['aud'] === 'add googleClientID here') {
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
