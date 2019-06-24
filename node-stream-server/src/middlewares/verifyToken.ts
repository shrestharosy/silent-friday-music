import { Request, Response, NextFunction } from 'express';
import * as jwtServices from '../utils/jwt';

export interface IVerifiedRequest extends Request {
  auth?: {
    userId: string;
  };
}

async function verifyToken(request: IVerifiedRequest, response: Response, next: NextFunction) {
  try {
    const accessToken = (request.headers.authorization as string).split('Bearer ')[1];

    if (!accessToken) {
      throw new Error('Missing token');
    } else {
      const { id } = (await jwtServices.verifyAccessToken(accessToken)) as { id: string };
      if (id) {
        request.auth = { userId: id };
        next();
      } else {
        throw new Error('Invalid token');
      }
    }
  } catch (error) {
    response.status(403).send({ message: 'Not Authorized' });
  }
}

export default verifyToken;
