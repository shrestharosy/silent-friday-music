import axiosInstance from 'src/utils/axios';

export interface ICreateRoomPayload {
  name: string;
  members: Array<string>;
  master: string;
}

export async function createRoomAPI(payload: ICreateRoomPayload) {
  const { name, members, master } = payload;
  const URL = `/rooms/`;
  const DATA = {
    name,
    members,
    master,
  };
  return axiosInstance
    .post(URL, DATA)
    .then(({ data }) => data)
    .catch(error => {
      throw error;
    });
}
