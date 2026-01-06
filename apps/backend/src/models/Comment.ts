import mongoose, { Document, Schema } from 'mongoose';
import { IComment } from '@heymalaysia/shared';

export interface ICommentDocument extends Omit<IComment, '_id'>, Document {}

const CommentSchema: Schema = new Schema({
	userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	username: { type: String, required: true },
	entityId: { type: String, required: true }, // 'global', 'Selangor', or PlaceID
	entityType: { type: String, required: true }, // 'Post', 'Place', 'Event'
	content: { type: String, required: true },
	parentId: { type: Schema.Types.ObjectId, ref: 'Comment', default: null },
	upvotes: { type: Number, default: 0 },
	createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<ICommentDocument>('Comment', CommentSchema);
