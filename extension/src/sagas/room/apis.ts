import axiosInstance from 'src/utils/axios';

export interface ICreateRoomPayload {
  name: string;
  members: Array<string>;
}

export interface IRemoveFinishedSongPayload {
  roomId: string;
  songId: string;
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

export function leaveRoomAPI(payload: string) {
  return axiosInstance
    .get(`/rooms/${payload}`)
    .then(({ data }) => data)
    .catch(error => {
      throw error;
    });
}

export function removeFinishedSong(payload: IRemoveFinishedSongPayload) {
  const { roomId, songId } = payload;
  return axiosInstance
    .patch(`/rooms/${roomId}/removeSong`, {
      songId,
    })
    .then(({ data }) => data)
    .catch(error => {
      throw error;
    });
}
