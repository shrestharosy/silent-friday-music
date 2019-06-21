import axiosInstance from 'src/utils/axios';

export interface IAddtoPlaylistPayload {
  roomId: string;
  url: string;
}

export async function addToPlayListAPI(payload: IAddtoPlaylistPayload) {
  const { roomId, url } = payload;
  const URL = `/rooms/${roomId}/songs`;
  const DATA = {
    url,
  };
  return axiosInstance
    .post(URL, DATA)
    .then(({ data }) => data)
    .catch(error => {
      throw error;
    });
}
