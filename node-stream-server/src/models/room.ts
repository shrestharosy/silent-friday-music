import { Schema, model, Document } from 'mongoose';

export interface IRoom {
  name: string;
  members: Array<string>;
  requests: Array<string>;
}

export interface IRoomUpdate {
  name?: string;
  members?: Array<string>;
  requests?: Array<string>;
}

const roomSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  members: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    required: true,
  },
  requests: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Song',
      },
    ],
  },
});

export default model<IRoom & Document>('Room', roomSchema);
