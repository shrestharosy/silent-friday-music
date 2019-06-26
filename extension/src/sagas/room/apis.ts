import axiosInstance from 'src/utils/axios';

export interface ICreateRoomPayload {
  name: string;
  members: Array<string>;
}

export async function createRoomAPI(payload: ICreateRoomPayload) {
  const { name, members } = payload;
  const URL = `/rooms/`;
  const DATA = {
    name,
    members,
  };
  return axiosInstance
    .post(URL, DATA)
    .then(({ data }) => data)
    .catch(error => {
      throw error;
    });
}
