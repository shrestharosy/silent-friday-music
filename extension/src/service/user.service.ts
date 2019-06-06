import axiosInstance from '../utils/axios';
import { storageUtils } from '../popup/utils';

async function getUserProfile(token: string) {
  try {
    const URL = `/user/me`;
    const HEADER = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axiosInstance.get(URL, HEADER);
    storageUtils.setInStorage('USER_PROFILE', data.name);
    return data;
  } catch (error) {
    throw error;
  }
}

export const UserService = {
  getUserProfile,
};
