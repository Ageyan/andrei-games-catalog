import mongoose, { Schema, Document } from 'mongoose';

import type { IFavoriteGame } from '../types/game.types';

const gameSchema = new Schema<IFavoriteGame>(
    {
        id: {
            type: Number,
            required: true,
        }, 
        name: { 
            type: String,
            required: true
        }, 
        background_image: String,
        rating: Number,
        released: String,
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    }
);

const FavoriteGame = mongoose.model<IFavoriteGame>('FavoriteGame', gameSchema);

export default FavoriteGame;