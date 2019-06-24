import axios from 'axios';
import config from '../config';
import * as storage from 'src/utils/storage.utils';
import * as storageConstants from 'src/constants/storage';

const axiosInstance = axios.create({
  baseURL: config.ApiEnv.baseURL,
});

axiosInstance.interceptors.request.use(function(config) {
  const accessToken = storage.getFromStorage(storageConstants.ACCESS_TOKEN);
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return config;
});

export default axiosInstance;
