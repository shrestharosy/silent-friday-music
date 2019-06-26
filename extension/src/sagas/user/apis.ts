import axiosInstance from 'src/utils/axios';

export async function fetchUsersAPI() {
  const URL = `/users`;
  return axiosInstance
    .get(URL)
    .then(({ data }) => data)
    .catch(error => {
      throw error;
    });
}
