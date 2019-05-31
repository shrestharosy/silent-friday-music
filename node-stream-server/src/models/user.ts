import mongoose from 'mongoose';
import { IUser } from '../services/user';

const Schema = mongoose.Schema;
export const userSchema = new Schema({
  name: { 
    type: String, 
    required: true 
  },
  userId: { 
    type: String 
  },
  email: { 
    type: String, 
    required: true 
  },
  image: { 
    type: String 
  },
  refreshToken: { 
    type: Array
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now
  }
}); 

export default mongoose.model<IUser>('User', userSchema); 
