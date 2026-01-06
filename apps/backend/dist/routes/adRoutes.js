"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adController_1 = require("../controllers/adController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.route('/').get(adController_1.getActiveAds).post(authMiddleware_1.protect, adController_1.createAd);
router.route('/admin').get(authMiddleware_1.protect, authMiddleware_1.admin, adController_1.getAllAds);
router.route('/:id/status').put(authMiddleware_1.protect, authMiddleware_1.admin, adController_1.updateAdStatus);
exports.default = router;
