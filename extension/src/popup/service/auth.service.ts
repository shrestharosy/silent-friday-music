import axiosInstance from "../utils/axios";
import { storageUtils } from "../utils";

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
