interface IApiEnvConfig {
  baseURL: string;
  timeout: number;
  songChangeBufferTime: number;
}

interface IConfigValue {
  ApiEnv: IApiEnvConfig;
}

const ApiEnv: IApiEnvConfig = {
  baseURL: envConfig.BASE_URL,
  timeout: +envConfig.TIMEOUT,
  songChangeBufferTime: +envConfig.SONG_CHANGE_BUFFER_TIME,
};

const Config: IConfigValue = {
  ApiEnv,
};

export default Config;
