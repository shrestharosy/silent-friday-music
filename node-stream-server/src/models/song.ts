import { Schema, model, Document } from 'mongoose';

export interface ICreateSong {
  title: string;
  thumbnailUrl: string;
  streamUrl: string;
  channelName: string;
  avatar: string;
}

export interface ISong extends ICreateSong {
  _id: string;
}

const songSchema = new Schema({
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
