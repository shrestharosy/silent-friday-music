interface IApiEnvConfig {
  baseURL: string;
  timeout: number;
}

interface IConfigValue {
  ApiEnv: IApiEnvConfig;
}

const ApiEnv: IApiEnvConfig = {
  baseURL: envConfig.BASE_URL,
  timeout: +envConfig.TIMEOUT,
};

const Config: IConfigValue = {
  ApiEnv,
};

export default Config;
