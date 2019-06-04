import RoomModel, { IRoom, IRoomUpdate } from '../models/room';

export async function createRoom() {
  try {
    const room = new RoomModel({
      name: 'test',
    });
    const createdRoom: IRoom = await room.save();
    return createdRoom;
  } catch (error) {
    throw error;
  }
}

export async function getAllRooms() {
  try {
    const roomList: Array<IRoom> = await RoomModel.find();
    return roomList;
  } catch (error) {
    throw error;
  }
}

export async function updateRoom(roomId: string, updateRoom: IRoomUpdate) {
  try {
    const updatedRoom = await RoomModel.findOneAndUpdate({ _id: roomId }, updateRoom, { new: true });
    return updatedRoom;
  } catch (error) {
    throw error;
  }
}
