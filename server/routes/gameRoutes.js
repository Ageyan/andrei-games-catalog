import express from 'express';
import * as gameController from '../controllers/gameController.js';

const router = express.Router();

router.post('/', gameController.addFavoriteGame);
router.get('/', gameController.getFavoriteGames);
router.delete('/:id', gameController.deleteFavoriteGame);

export default router;