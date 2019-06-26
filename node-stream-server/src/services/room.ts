import RoomModel, { IRoom, IRoomUpdate } from '../models/room';
import getSocketInstance from '../services/socket';
import {
  BROADCAST_MASTER_SELECTION_REQUEST,
  REQUEST_TO_BE_MASTER,
  CHECK_MASTER_IS_ONLINE,
  ACK_MASTER_IS_ONLINE,
  UPDATE_ROOM_DETAILS,
} from '../../../extension/src/constants/socket';
import { ISocketRequest, getSocketIds } from '../socket';
import { Document } from 'mongoose';
import config from '../config';

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

export async function getRoomById(roomId: string, populate = true) {
  try {
    const foundRoom = populate
      ? await RoomModel.findById(roomId).populate('requests')
      : await RoomModel.findById(roomId);
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
    const { name: queriedName, master: queriedMaster } = await getRoomById(roomId);
    const { name = queriedName, members = [], requests = [], master = queriedMaster } = updateRoom;
    const updatedRoom = await RoomModel.findByIdAndUpdate(
      { _id: roomId },
      { name, master, $push: { members, requests } },
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

export async function selectMaster(roomId: string) {
  try {
    const { members } = await getRoomById(roomId);

    const ioInstance = getSocketInstance().getIOInstance();

    ioInstance.emit(roomId, { type: BROADCAST_MASTER_SELECTION_REQUEST });

    const socketIds = getSocketIds(members);

    const activeSockets = ioInstance.sockets.sockets;

    const potentialMasterIds: Array<string> = [];

    const masterRequestCallBack = async (request: ISocketRequest) => {
      const {
        payload: { userId },
      } = request.message as { payload: { userId: string } };

      potentialMasterIds.push(userId);
      if (potentialMasterIds.length === 1) {
        try {
          const updatedRoom = await updateRoom(roomId, { master: userId });
          ioInstance.emit(roomId, { type: UPDATE_ROOM_DETAILS, payload: updatedRoom });
        } catch (error) {
          throw error;
        }
      }
    };

    socketIds.map(socketId => {
      const activeSocket = activeSockets[socketId];

      activeSocket.once(JSON.stringify({ type: REQUEST_TO_BE_MASTER, roomId }), masterRequestCallBack);
    });
  } catch (error) {
    console.log(error);
  }
}

export function isMasterActiveInRoom(room: IRoom & Document) {
  try {
    const ioInstance = getSocketInstance().getIOInstance();

    const [masterSocketId] = getSocketIds([room.master]);

    if (!masterSocketId) {
      selectMaster(room._id);
    } else {
      const activeSockets = ioInstance.sockets.sockets;

      let shouldSelectNewMaster = true;

      activeSockets[masterSocketId].once(
        JSON.stringify({ type: ACK_MASTER_IS_ONLINE, roomId: room._id }),
        (request: ISocketRequest) => {
          if (!!request.message && !!request.receiverId) {
            shouldSelectNewMaster = false;
          }
        }
      );
      setTimeout(() => {
        if (shouldSelectNewMaster) {
          selectMaster(room._id);
        }
      }, +config.masterResponseTimeTolerance);

      ioInstance.emit(room._id, { type: CHECK_MASTER_IS_ONLINE });
    }
  } catch (error) {
    console.log(error);
  }
}
