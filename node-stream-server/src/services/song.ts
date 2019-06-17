import SongModel from '../models/song';
import { getRoomById } from './room';

export async function getSongById(songId: string) {
  try {
    const songDetails = await SongModel.findById(songId);
    return songDetails;
  } catch (error) {
    throw error;
  }
}

export async function getPlaylist(roomId: string) {
  try {
    const room = await getRoomById(roomId);
    return room.requests;
  } catch (error) {
    throw error;
  }
}
