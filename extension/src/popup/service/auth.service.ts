import * as storageUtils from 'src/utils/storage.utils';
import axiosInstance from 'src/utils/axios';

async function loginRequest(token: string) {
  try {
    const URL = `/auth/login`;
    const { data } = await axiosInstance.post(URL, { token });
    storageUtils.setInStorage('TOKEN', data.accessToken);
    return data;
  } catch (error) {
    throw error;
  }
}

export const AuthService = {
  loginRequest,
};
