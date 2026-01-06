"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const placeController_1 = require("../controllers/placeController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.route('/').get(placeController_1.getPlaces).post(authMiddleware_1.protect, authMiddleware_1.admin, placeController_1.createPlace);
router
    .route('/:id')
    .get(placeController_1.getPlaceById)
    .put(authMiddleware_1.protect, authMiddleware_1.admin, placeController_1.updatePlace)
    .delete(authMiddleware_1.protect, authMiddleware_1.admin, placeController_1.deletePlace);
exports.default = router;
