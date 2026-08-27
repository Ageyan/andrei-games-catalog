import express from 'express';
import * as gameController from '../controllers/gameController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, gameController.addFavoriteGame);
router.get('/', protect, gameController.getFavoriteGames);
router.delete('/:id', protect, gameController.deleteFavoriteGame);

export default router;