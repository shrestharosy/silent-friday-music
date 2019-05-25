import * as dotenv from 'dotenv';
dotenv.config();

export default {
  googleAuth: {
    googleClientId: process.env.GOOGLE_CLIENT_ID || 'abc123',
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || 'abc123',
    authRedirect: process.env.AUTH_REDIRECT
  },
  auth: {
    saltRounds: process.env.SALT_ROUNDS,
    accessTokenDuration: process.env.ACCESS_TOKEN_DURATION, 
    refreshTokenDuration: process.env.REFRESH_TOKEN_DURATION,
    accessTokenSecretKey: process.env.ACCESS_TOKEN_SECRET_KEY || 'abc123',
    refreshTokenSecretKey: process.env.REFRESH_TOKEN_SECRET_KEY || 'abc123'
  },
  timeout: process.env.TIEMOUT
}

