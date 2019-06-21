import * as songServices from '../services/song';

export interface IAddToPlayistPayload {
  roomId: string;
  url: string;
}

export interface IGetPlaylistPayload {
  roomId: string;
}

interface ISongDetailsPayload {
  songId: string;
}

export async function addToPlaylist(payload: IAddToPlayistPayload) {
  try {
    const { roomId, url } = payload;
    const updatedPlayList = await songServices.addToPlaylist(roomId, url);
    return updatedPlayList;
  } catch (error) {
    throw error;
  }
}

export async function getPlaylist(payload: IGetPlaylistPayload) {
  try {
    const { roomId } = payload;
    const playList = await songServices.getPlaylist(roomId);
    return playList;
  } catch (error) {
    throw error;
  }
}

export async function getSongDetails(payload: ISongDetailsPayload) {
  try {
    const { songId } = payload;
    const songDetails = await songServices.getSongById(songId);
    return songDetails;
  } catch (error) {
    throw error;
  }
}
