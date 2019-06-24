import RoomModel, { IRoom, IRoomUpdate } from '../models/room';
import { Types } from 'mongoose';

interface IRoomQueryParams {
  search?: string;
  userId?: string;
}

export async function createRoom(newRoom: IRoom) {
  try {
    const { name, members = [], requests = [] } = newRoom;
    const room = new RoomModel({
      name,
      members,
      requests,
    });
    const createdRoom: IRoom = await room.save();
    return createdRoom;
  } catch (error) {
    throw error;
  }
}

export async function getAllRooms(queryParams: IRoomQueryParams = { search: '', userId: '' }) {
  try {
    const { search = '', userId = '' } = queryParams;

    const searchRegex = new RegExp(search, 'i');
    const roomList: Array<IRoom> = await RoomModel.find({ name: searchRegex, members: userId });

    return roomList;
  } catch (error) {
    throw error;
  }
}

export async function getRoomById(roomId: string) {
  try {
    const foundRoom = await RoomModel.findById(roomId).populate('requests');
    if (foundRoom) {
      return foundRoom;
    } else {
      throw new Error("Room doesn't exist for a given id");
    }
  } catch (error) {
    throw error;
  }
}

export async function updateRoom(roomId: string, updateRoom: IRoomUpdate) {
  try {
    const { name: queriedName } = await getRoomById(roomId);
    const { name = queriedName, members = [], requests = [] } = updateRoom;
    const updatedRoom = await RoomModel.findByIdAndUpdate(
      { _id: roomId },
      { name, $push: { members, requests } },
      { new: true }
    ).populate('requests');
    if (updatedRoom) {
      return updatedRoom;
    } else {
      throw new Error("Room doesn't exist for a given id. Room couldn't be updated.");
    }
  } catch (error) {
    throw error;
  }
}
