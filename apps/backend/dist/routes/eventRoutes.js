"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const eventController_1 = require("../controllers/eventController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.route('/').get(eventController_1.getEvents).post(authMiddleware_1.protect, eventController_1.createEvent);
router.route('/admin').get(authMiddleware_1.protect, authMiddleware_1.admin, eventController_1.getAdminEvents);
router.route('/:id/approve').put(authMiddleware_1.protect, authMiddleware_1.admin, eventController_1.approveEvent);
exports.default = router;
