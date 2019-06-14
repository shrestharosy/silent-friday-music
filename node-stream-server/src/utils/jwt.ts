import jwbt from 'jsonwebtoken';
import config from '../config';

interface ITokenPayload {
  id: string;
}

export function generateAccessToken(data: ITokenPayload | string) {
  return jwbt.sign(data, config.auth.accessTokenSecretKey, { expiresIn: config.auth.accessTokenDuration });
}

export function generateRefreshToken(data: ITokenPayload | string) {
  return jwbt.sign(data, config.auth.refreshTokenSecretKey, { expiresIn: config.auth.refreshTokenDuration });
}

export function verifyAccessToken(token: string) {
  return jwbt.verify(token, config.auth.accessTokenSecretKey);
}

export function verifyRefreshToken(token: string) {
  return jwbt.verify(token, config.auth.refreshTokenSecretKey);
}

export function decodeToken(token: string) {
  const jwtDecoded = jwbt.decode(token);
  let decodedToken = null;
  if (typeof jwtDecoded === 'object') {
    decodedToken = jwtDecoded as ITokenPayload;
  } else {
    decodedToken = jwtDecoded;
  }
  return decodedToken;
}
