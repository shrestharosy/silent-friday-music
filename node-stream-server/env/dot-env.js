const dotEnv = require('dotenv');

function getEnvConfig() {
  dotEnv.Config({ path: `./.env`});
  if(
    process.env.GOOGLE_CLIENT_ID &&
    process.env.GOOGLE_CLIENT_SECRET &&
    process.env.GOOGLE_REDIRECT
  ) {
    return {
      CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
      CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
      REDIRECT: process.env.GOOGLE_REDIRECT
    }
  } else {
    let error = `.env file missing or environment values missing`;
    throw new Error(error);
  }
}

module.exports = {
  getEnvConfig
};

