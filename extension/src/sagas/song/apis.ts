import axiosInstance from 'src/utils/axios';

export interface ISongsPayload {
  roomId: string;
}

export interface IAddtoPlaylistPayload extends ISongsPayload {
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

export async function getPlaylistAPI(payload: ISongsPayload) {
  const { roomId } = payload;
  const URL = `/rooms/${roomId}/songs`;
  return axiosInstance(URL)
    .then(({ data }) => data)
    .catch(error => {
      throw error;
    });
}

export async function fetchCurrentSongDetails(payload: string) {
  return axiosInstance
    .get(`/songs/${payload}`)
    .then(({ data }) => data)
    .catch(error => {
      throw error;
    });
}
