import axiosInstance from '../popup/utils/axios';

async function loginRequest(token: string) {
  try {
    const URL = `/auth/login`;
    const { data } = await axiosInstance.post(URL, { token });
    return data;
  } catch (error) {
    throw error;
  }
}

async function getUserId(token: string) {
  try {
    const URL = `https://www.googleapis.com/oauth2/v2/userinfo?alt=json`;

    const HEADER = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axiosInstance(URL, HEADER);
    debugger;
    return data;
  } catch (error) {
    throw error;
  }
}

export const AuthService = {
  loginRequest,
  getUserId,
};
