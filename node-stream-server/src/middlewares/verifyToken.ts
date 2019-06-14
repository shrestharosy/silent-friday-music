import { Request, Response, NextFunction } from 'express';
import * as jwtServices from '../utils/jwt';

async function verifyToken(request: Request, response: Response, next: NextFunction) {
  try {

    const accessToken = (request.headers.accesstoken as string).split('Bearer ')[1];

    if (!accessToken) {
      response.status(403).send({ message : 'Missing Token' });
    } else {
      await jwtServices.verifyAccessToken(accessToken);
      // response.send(decodedUser);
      next();
    }
    
  } catch(error) {
    response.redirect('/auth/unauthorized');
  }
}

export default verifyToken;