import mongoose, { Schema, Document } from 'mongoose';
import { IEvent } from '@heymalaysia/shared/src/types';

export interface IEventDocument extends Omit<IEvent, '_id'>, Document {}

const EventSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: {
      name: { type: String, required: true },
      lat: { type: Number },
      lng: { type: Number }
    },
    approved: { type: Boolean, default: false },
    paymentReference: { type: String },
    submittedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

export default mongoose.model<IEventDocument>('Event', EventSchema);
