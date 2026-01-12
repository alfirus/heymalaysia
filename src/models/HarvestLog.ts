import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IHarvestLog extends Document {
  _id: string; // Singleton ID usually
  countryKey: string;
  stateKey: string;
  districtIndex: number;
  categoryKey: string;
  subType: 'types' | 'keywords';
  itemIndex: number;
  nextPageToken?: string | null;
  lastRun: Date;
}

const HarvestLogSchema: Schema = new Schema({
  _id: { type: String, default: 'main_harvester' },
  countryKey: { type: String, default: null }, // e.g., 'Malaysia'
  stateKey: { type: String, default: null }, // e.g., 'Johor'
  districtIndex: { type: Number, default: 0 },
  categoryKey: { type: String, default: null }, // e.g., 'religious'
  subType: { type: String, enum: ['types', 'keywords'], default: 'types' },
  itemIndex: { type: Number, default: 0 },
  nextPageToken: { type: String, default: null },
  lastRun: { type: Date, default: Date.now },
});

// Prevent model overwrite
const HarvestLog: Model<IHarvestLog> = mongoose.models.HarvestLog || mongoose.model<IHarvestLog>('HarvestLog', HarvestLogSchema);

export default HarvestLog;
