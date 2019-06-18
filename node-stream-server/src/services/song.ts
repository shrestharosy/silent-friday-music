import ytdl from 'ytdl-core';

import SongModel, { ISong, ICreateSong } from '../models/song';
import { getRoomById, updateRoom } from './room';

export async function getSongDetails(url: string) {
  try {
    const basicInfo = await ytdl.getBasicInfo(url);
    const {
      author: { avatar, name },
      title,
      player_response: {
        videoDetails: { videoId },
      },
    } = basicInfo;
    const response = {
      avatar,
      channelName: name,
      title,
      thumbnailUrl: `https://i1.ytimg.com/vi/${videoId}/hqdefault.jpg`,
      streamUrl: `http://localhost:3002/stream?v=${url}`,
    };
    return response;
  } catch (error) {
    throw error;
  }
}

export async function addSong(newSong: ICreateSong) {
  try {
    const { title, thumbnailUrl, streamUrl } = newSong;
    const song = new SongModel({
      title,
      thumbnailUrl,
      streamUrl,
    });
    const addedSong: ISong = await song.save();
    return addedSong;
  } catch (error) {
    throw error;
  }
}

export async function getSongById(songId: string) {
  try {
    const song = await SongModel.findById(songId);
    return song;
  } catch (error) {
    throw error;
  }
}

export async function addToPlaylist(roomId: string, url: string) {
  try {
    const songDetails = await getSongDetails(url);
    const { _id } = await addSong(songDetails);
    const updatedRoom = await updateRoom(roomId, { requests: [_id] });
    return updatedRoom;
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
