import mongoose, { Schema, Document, Model, CallbackError } from 'mongoose';

export interface IPlace extends Document {
  place_id: string;
  name: string;
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  location?: {
    type: 'Point';
    coordinates: [number, number]; // [lng, lat]
  };
  types: string[];
  rating?: number;
  user_ratings_total?: number;
  price_level?: number;
  photos?: any[];
  harvested_from: {
    country: string;
    state: string;
    district: string;
    keyword: string;
    category: string;
  };
  created_at: Date;
  updated_at: Date;
}

const PlaceSchema = new Schema<IPlace>({
  place_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  formatted_address: { type: String },
  geometry: {
    location: {
      lat: { type: Number },
      lng: { type: Number },
    },
  },
  types: [{ type: String }],
  rating: { type: Number },
  user_ratings_total: { type: Number },
  price_level: { type: Number },
  photos: [{ type: Schema.Types.Mixed }], // Storing raw photo objects primarily
  harvested_from: {
    country: { type: String },
    state: { type: String },
    district: { type: String },
    keyword: { type: String },
    category: { type: String },
  },
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true }, // [lng, lat]
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

// Update updated_at on save
PlaceSchema.pre('save', function (this: IPlace) {
  this.updated_at = new Date();
});

// Index for geolocation searching
PlaceSchema.index({ location: '2dsphere' });

// Prevent model overwrite in serverless environment
const Place: Model<IPlace> = mongoose.models.Place || mongoose.model<IPlace>('Place', PlaceSchema);

export default Place;
