import mongoose, { Schema, Document } from 'mongoose';
import { IPlace } from '@heymalaysia/shared/src/types';

export interface IPlaceDocument extends Omit<IPlace, '_id'>, Document {}

const PlaceSchema: Schema = new Schema(
	{
		googlePlaceId: { type: String, unique: true, sparse: true },
		name: { type: String, required: true },
		description: { type: String },
		category: { type: String, default: 'Urban' }, // Can map from types later
		state: { type: String },
		formattedAddress: { type: String },
		location: {
			type: { type: String, enum: ['Point'], default: 'Point' },
			coordinates: { type: [Number], index: '2dsphere' }, // [lng, lat]
		},
		types: [{ type: String }],
		rating: { type: Number },
		userRatingsTotal: { type: Number },
		openingHours: { type: Schema.Types.Mixed },
		photos: [{ type: Schema.Types.Mixed }],
		images: [{ type: String }],
		content: { type: String },
		featured: { type: Boolean, default: false },
		status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'approved' },
	},
	{ timestamps: true }
);

export default mongoose.model<IPlaceDocument>('Place', PlaceSchema);
