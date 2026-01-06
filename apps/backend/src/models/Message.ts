import mongoose, { Document, Schema } from 'mongoose';
import { IMessage } from '@heymalaysia/shared';

// Define the document interface extending the shared interface
export interface IMessageDocument extends Omit<IMessage, '_id'>, Document {}

const MessageSchema: Schema = new Schema({
  senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  receiverId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  read: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model<IMessageDocument>('Message', MessageSchema);
