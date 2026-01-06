import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import connectDB from './config/db';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { configureChatSockets } from './sockets/chatSocket';

import authRoutes from './routes/authRoutes';
import placeRoutes from './routes/placeRoutes';
import eventRoutes from './routes/eventRoutes';
import adRoutes from './routes/adRoutes';
import historyRoutes from './routes/historyRoutes';
import userRoutes from './routes/userRoutes';
import weatherRoutes from './routes/weatherRoutes';
import commentRoutes from './routes/commentRoutes';

dotenv.config();

connectDB();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST'],
	},
});

app.use(cors());
app.use(helmet());
app.use(express.json());

import messageRoutes from './routes/messageRoutes';

app.use('/api/auth', authRoutes);
app.use('/api/places', placeRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/ads', adRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/users', userRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/messages', messageRoutes);

import { errorHandler } from './middleware/errorMiddleware';
app.use(errorHandler);

configureChatSockets(io);

// Cron Job: Run POI Harvester every minute (for MVP/Demo purposes)
import cron from 'node-cron';
import { runPoiHarvest } from './services/poiHarvester';

cron.schedule('* * * * *', () => {
	runPoiHarvest();
});

app.get('/', (req, res) => {
	res.send('Hey Malaysia API is running...');
});

const PORT = process.env.PORT || 5555;

httpServer.listen(PORT, () => {
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
