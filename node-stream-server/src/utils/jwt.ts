import jwbt from 'jsonwebtoken';
import config from '../config';

// TODO: Set fixed type for 'data'
export function generateAccessToken(data: any) {
  return jwbt.sign(data, config.auth.accessTokenSecretKey, { expiresIn: config.auth.accessTokenDuration });  
}

// TODO: Set fixed type for 'data'
export function generateRefreshToken(data: any) {
  return jwbt.sign(data, config.auth.refreshTokenSecretKey, { expiresIn: config.auth.refreshTokenDuration });
}

export function verifyAccessToken(token: string) {
  return jwbt.verify(token, config.auth.accessTokenSecretKey);
}

export function verifyRefreshToken(token: string) {
  return jwbt.verify(token, config.auth.refreshTokenSecretKey);
}

export function decodeToken(token: string) {
  return jwbt.decode(token);
}