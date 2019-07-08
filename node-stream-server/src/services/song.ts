import ytdl from 'ytdl-core';

import SongModel, { ISong } from '../models/song';
import { getRoomById, updateRoom } from './room';

export async function addToPlaylist(roomId: string, url: string) {
  try {
    const { _id } = await addSong(url);
    const updatedPlaylist = await updateRoom(roomId, { requests: [_id] });
    return updatedPlaylist;
  } catch (error) {
    throw error;
  }
}

export async function getPlaylist(roomId: string) {
  const room = await getRoomById(roomId);
  return room.requests;
}

export async function getSongById(songId: string) {
  try {
    const song = await SongModel.findById(songId);
    return song;
  } catch (error) {
    throw error;
  }
}

export async function searchByUrl(url: string) {
  try {
    const song = await SongModel.findOne({ streamUrl: url });
    return song;
  } catch (error) {
    throw error;
  }
}

export async function getSongDetails(url: string) {
  try {
    const basicInfo = await ytdl.getBasicInfo(url);
    const {
      author: { avatar, name },
      title,
      player_response: {
        videoDetails: { videoId },
      },
      length_seconds: lengthSeconds,
    } = basicInfo;
    const response = {
      avatar,
      channelName: name,
      title,
      thumbnailUrl: `https://i1.ytimg.com/vi/${videoId}/hqdefault.jpg`,
      streamUrl: `${url}`,
      lengthSeconds,
    };
    return response;
  } catch (error) {
    throw error;
  }
}

export async function addSong(url: string) {
  try {
    const existingSong = await searchByUrl(url);

    if (existingSong === null) {
      const songDetails = await getSongDetails(url);
      const { title, thumbnailUrl, streamUrl, lengthSeconds } = songDetails;

      const song = new SongModel({
        title,
        thumbnailUrl,
        streamUrl,
        lengthSeconds,
      });
      const addedSong: ISong = await song.save();
      return addedSong;
    } else {
      return existingSong;
    }
  } catch (error) {
    throw error;
  }
}
