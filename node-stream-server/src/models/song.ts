import { Schema, model, Document } from 'mongoose';

export interface ISong {
  title: string;
  thumbnailUrl: string;
  streamUrl: string;
  channelName: string;
  avatar: string;
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

export default model<ISong & Document>('Song', songSchema);
