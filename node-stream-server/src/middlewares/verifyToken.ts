import { Request, Response, NextFunction } from 'express';
import * as jwtServices from '../utils/jwt';

async function verifyToken(req: Request, res: Response, next: NextFunction) {
  try {
    // TODO: check how tokens are stored in accessToken
    // TODO: ask about storing in res.locals.*
    // TODO: ask about duration of refresh and access tokens
    const accessToken = req.headers.accessToken;
    if (accessToken) {
      throw new Error('No token error');
    } else {
      
    }
    
    const response = await jwtServices.verifyAccessToken(accessToken);
    // TODO: if verified add response to res.local.
  } catch(error) {
    next(error);
  }
}

export default verifyToken;