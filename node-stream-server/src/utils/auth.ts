import * as jwtServices from './jwt';

export function getUserIdFromAuthHeader(header: string) {
  const token = header.split(/\s+/).pop() || '';
  const verificationResponse = jwtServices.verifyAccessToken(token);
  if (typeof verificationResponse === 'object') {
    const { id } = verificationResponse as { id: string };
    return id;
  } else {
    return null;
  }
}
