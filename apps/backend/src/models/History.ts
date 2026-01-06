import mongoose, { Document, Schema } from 'mongoose';

export interface IHistory extends Document {
  title: string;
  content: string;
  era: string; // e.g., 'Pre-Colonial', 'Colonial', 'Independence', 'Modern'
  year: string; // String to allow '1500s', '1957', etc.
  images: string[];
  createdAt: Date;
}

const HistorySchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  era: { type: String, required: true },
  year: { type: String, required: true },
  images: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IHistory>('History', HistorySchema);
