import mongoose, { Schema, Document } from 'mongoose';
import { IAd } from '@heymalaysia/shared/src/types';

export interface IAdDocument extends Omit<IAd, '_id'>, Document {}

const AdSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    targetUrl: { type: String, required: true },
    status: { 
      type: String, 
      enum: ['pending', 'active', 'rejected', 'expired'], 
      default: 'pending' 
    },
    paymentReference: { type: String },
    submittedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    duration: { type: Number, required: true }, // in days
  },
  { timestamps: true }
);

export default mongoose.model<IAdDocument>('Ad', AdSchema);
