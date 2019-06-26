const dotEnv = require('dotenv');

function getEnvConfig(environment) {
  dotEnv.config({ path: `./.env.${environment}` });

  if (process.env.BASE_URL && process.env.TIMEOUT) {
    return {
      BASE_URL: process.env.BASE_URL,
      TIMEOUT: process.env.TIMEOUT,
      SONG_CHANGE_BUFFER_TIME: process.env.SONG_CHANGE_BUFFER_TIME,
    };
  } else {
    let errorMessage = `Cannot find .env.${environment} file or environment values are missing`;
    throw new Error(errorMessage);
  }
}

module.exports = {
  getEnvConfig,
};
