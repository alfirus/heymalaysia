"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const chatSocket_1 = require("./sockets/chatSocket");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const placeRoutes_1 = __importDefault(require("./routes/placeRoutes"));
const eventRoutes_1 = __importDefault(require("./routes/eventRoutes"));
const adRoutes_1 = __importDefault(require("./routes/adRoutes"));
const historyRoutes_1 = __importDefault(require("./routes/historyRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const weatherRoutes_1 = __importDefault(require("./routes/weatherRoutes"));
const commentRoutes_1 = __importDefault(require("./routes/commentRoutes"));
dotenv_1.default.config();
(0, db_1.default)();
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
const messageRoutes_1 = __importDefault(require("./routes/messageRoutes"));
app.use('/api/auth', authRoutes_1.default);
app.use('/api/places', placeRoutes_1.default);
app.use('/api/events', eventRoutes_1.default);
app.use('/api/ads', adRoutes_1.default);
app.use('/api/history', historyRoutes_1.default);
app.use('/api/users', userRoutes_1.default);
app.use('/api/weather', weatherRoutes_1.default);
app.use('/api/comments', commentRoutes_1.default);
app.use('/api/messages', messageRoutes_1.default);
const errorMiddleware_1 = require("./middleware/errorMiddleware");
app.use(errorMiddleware_1.errorHandler);
(0, chatSocket_1.configureChatSockets)(io);
// Cron Job: Run POI Harvester every minute (for MVP/Demo purposes)
const node_cron_1 = __importDefault(require("node-cron"));
const poiHarvester_1 = require("./services/poiHarvester");
node_cron_1.default.schedule('* * * * *', () => {
    (0, poiHarvester_1.runPoiHarvest)();
});
app.get('/', (req, res) => {
    res.send('Hey Malaysia API is running...');
});
const PORT = process.env.PORT || 5555;
httpServer.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
