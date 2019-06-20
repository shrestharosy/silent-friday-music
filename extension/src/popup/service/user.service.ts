import * as storageUtils from 'src/utils/storage.utils';
import axiosInstance from 'src/utils/axios';
import * as storageConstants from 'src/constants/storage';

async function getUserProfile(token: string) {
  try {
    const URL = `/user/me`;
    const HEADER = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axiosInstance.get(URL, HEADER);
    storageUtils.setInStorage(storageConstants.USER_PROFILE, data.name);
    return data;
  } catch (error) {
    throw error;
  }
}

export const UserService = {
  getUserProfile,
};
