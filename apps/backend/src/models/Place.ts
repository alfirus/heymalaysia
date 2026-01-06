import mongoose, { Schema, Document } from 'mongoose';
import { IPlace } from '@heymalaysia/shared/src/types';

export interface IPlaceDocument extends Omit<IPlace, '_id'>, Document {}

const PlaceSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, enum: ['Nature', 'Urban', 'Heritage'], required: true },
    state: { type: String, required: true },
    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
      address: { type: String }
    },
    images: [{ type: String }],
    content: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IPlaceDocument>('Place', PlaceSchema);
