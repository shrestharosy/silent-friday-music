import RoomModel, { IRoom, IRoomUpdate } from '../models/room';

interface IRoomQueryParams {
  search?: string;
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

export async function getAllRooms(queryParams: IRoomQueryParams = { search: '' }) {
  const defaultJSONOptions = RoomModel.schema.get('toJSON');

  try {
    const { search = '' } = queryParams;
    const searchRegex = new RegExp(search, 'i');
    const roomList: Array<IRoom> = await RoomModel.find({ name: searchRegex });

    return roomList;
  } catch (error) {
    throw error;
  } finally {
    RoomModel.schema.set('toJSON', defaultJSONOptions);
  }
}

export async function getRoomById(roomId: string) {
  try {
    const foundRoom = await RoomModel.findById(roomId);
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
    const updatedRoom = await RoomModel.findOneAndUpdate({ _id: roomId }, updateRoom, { new: true });
    return updatedRoom;
  } catch (error) {
    throw error;
  }
}
