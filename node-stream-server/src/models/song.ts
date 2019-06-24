import { Schema, model, Document } from 'mongoose';

export interface ICreateSong {
  // roomId: string;
  title: string;
  thumbnailUrl: string;
  streamUrl: string;
  // channelName: string;
  // avatar: string;
}

export interface ISong extends ICreateSong {
  _id: string;
}

export const songSchema = new Schema({
  room: { type: Schema.Types.ObjectId, ref: 'Room' },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  title: {
    type: String,
    required: true,
  },
  thumbnailUrl: {
    type: String,
  },
  streamUrl: {
    type: String,
    required: true,
  },
});

export default model<ICreateSong & Document>('Song', songSchema);
