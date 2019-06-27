declare var environment: string;

declare var envConfig: IEnvConfig;

interface IEnvConfig {
  BASE_URL: string;
  TIMEOUT: string;
  SONG_CHANGE_BUFFER_TIME: string;
}
