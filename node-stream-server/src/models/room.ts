import { Schema, model } from 'mongoose';

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
  },
});

export default model('Room', roomSchema);
