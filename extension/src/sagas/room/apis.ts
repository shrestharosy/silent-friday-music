import axiosInstance from 'src/utils/axios';

export async function fetchRoomsList() {
  return axiosInstance
    .get(`/rooms`)
    .then(({ data }) => data)
    .catch(error => {
      throw error;
    });
}

export async function fetchRoomInfo(payload: string) {
  return axiosInstance
    .get(`/rooms/${payload}`)
    .then(({ data }) => data)
    .catch(error => {
      throw error;
    });
}
