const dotEnv = require('dotenv');

function getEnvConfig() {
  dotEnv.Config({ path: `./.env`});
  if(
    process.env.CLIENT_ID &&
    process.env.CLIENT_SECRET &&
    process.env.REDIRECT
  ) {
    return {
      CLIENT_ID: process.env.CLIENT_ID,
      CLIENT_SECRET: process.env.CLIENT_SECRET,
      REDIRECT: process.env.REDIRECT
    }
  } else {
    let error = `.env file missing or environment values missing`;
    throw new Error(error);
  }
}

module.exports = {
  getEnvConfig
};

