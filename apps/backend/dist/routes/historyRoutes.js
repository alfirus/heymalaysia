"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const historyController_1 = require("../controllers/historyController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.route('/').get(historyController_1.getHistory).post(authMiddleware_1.protect, authMiddleware_1.admin, historyController_1.createHistory);
router
    .route('/:id')
    .get(historyController_1.getHistoryById)
    .put(authMiddleware_1.protect, authMiddleware_1.admin, historyController_1.updateHistory)
    .delete(authMiddleware_1.protect, authMiddleware_1.admin, historyController_1.deleteHistory);
exports.default = router;
