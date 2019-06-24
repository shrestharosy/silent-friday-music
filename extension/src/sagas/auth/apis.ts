import axiosInstance from 'src/utils/axios';

export interface ILoginPayload {
  token: string;
}

export async function loginAPI(payload: ILoginPayload) {
  const URL = `/auth/login`;
  const { token } = payload;
  return axiosInstance
    .post(URL, { token })
    .then(({ data }) => data)
    .catch(error => {
      throw error;
    });
}

export async function fetchProfileAPI() {
  return axiosInstance
    .get('/users/me')
    .then(({ data }) => data)
    .catch(error => {
      throw error;
    });
}
