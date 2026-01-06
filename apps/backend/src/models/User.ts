import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from '@heymalaysia/shared/src/types';

export interface IUserDocument extends Omit<IUser, '_id'>, Document {
  password: string;
}

const UserSchema: Schema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Will be hashed
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
  },
  { timestamps: true }
);

export default mongoose.model<IUserDocument>('User', UserSchema);
