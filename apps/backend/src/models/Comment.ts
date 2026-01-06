import mongoose, { Schema, Document } from 'mongoose';
import { IComment } from '@heymalaysia/shared/src/types';

export interface ICommentDocument extends Omit<IComment, '_id'>, Document {}

const CommentSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    username: { type: String }, // Optional, can be populated or denormalized
    entityId: { type: Schema.Types.ObjectId, required: true }, // Place or Event ID
    entityType: { type: String, enum: ['Place', 'Event', 'Post'], required: true },
    content: { type: String, required: true },
    parentId: { type: Schema.Types.ObjectId, ref: 'Comment' }, // For nested comments
    upvotes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<ICommentDocument>('Comment', CommentSchema);
