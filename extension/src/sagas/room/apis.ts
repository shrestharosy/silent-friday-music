import axios from 'src/utils/axios';

export function leaveRoomAPI(payload: string) {
  return axios
    .get(`/rooms/${payload}`)
    .then(({ data }) => data)
    .catch(error => {
      throw error;
    });
}
