import * as dotenv from 'dotenv';
dotenv.config();

export default {
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  authRedirect: process.env.AUTH_REDIRECT
}