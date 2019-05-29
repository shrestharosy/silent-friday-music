import jwbt from 'jsonwebtoken';
import config from '../config';

// TODO: Set fixed type for 'data'
export function generateAccessToken(data: any) {
  return jwbt.sign(data, config.auth.accessTokenSecretKey);  
}

// TODO: Set fixed type for 'data'
export function generateRefreshToken(data: any) {
  return jwbt.sign(data, config.auth.refreshTokenSecretKey);
}

export function verifyAccessToken(token: string) {
  return jwbt.verify(token, config.auth.accessTokenSecretKey);
}

export function verifyRefreshToken(token: string) {
  return jwbt.verify(token, config.auth.refreshTokenSecretKey);
}