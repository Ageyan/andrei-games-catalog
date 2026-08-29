import express from 'express';

import { protect } from '../middleware/authMiddleware';

import * as gameController from '../controllers/gameController';


const router = express.Router();

router.post('/', protect, gameController.addFavoriteGame);
router.get('/', protect, gameController.getFavoriteGames);
router.delete('/:id', protect, gameController.deleteFavoriteGame);

export default router;