export interface IUser {
  _id?: string;
  username: string;
  email: string;
  role: 'admin' | 'user';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPlace {
  _id?: string;
  name: string;
  description: string;
  category: 'Nature' | 'Urban' | 'Heritage';
  state: string;
  location: {
    lat: number;
    lng: number;
    address?: string;
  };
  images: string[];
  content: string; // Rich text / markdown
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IEvent {
  _id?: string;
  title: string;
  description: string;
  date: Date;
  location: {
    name: string;
    lat?: number;
    lng?: number;
  };
  approved: boolean;
  paymentReference?: string;
  submittedBy?: string; // User ID
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IAd {
  _id?: string;
  title: string;
  imageUrl: string;
  targetUrl: string;
  status: 'pending' | 'active' | 'rejected' | 'expired';
  paymentReference?: string;
  submittedBy?: string; // User ID
  duration: number; // in days
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IComment {
  _id?: string;
  userId: string;
  username?: string; // denormalized for easier display
  entityId: string; // Place ID, Event ID, etc.
  entityType: 'Place' | 'Event' | 'Post';
  content: string;
  parentId?: string; // For nested threads
  upvotes: number;
  createdAt?: Date;
  updatedAt?: Date;
}
