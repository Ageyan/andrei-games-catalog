import mongoose from 'mongoose';

const gameSchema = mongoose.Schema(
    {
        id: {
            type: Number,
            required: true,
            unique: true
        }, 
        name: {
            type: String,
            required: true
        }, 
        background_image: String,
        rating: Number,
        released: String
    }
);

const FavoriteGame = mongoose.model('FavoriteGame', gameSchema);

export default FavoriteGame;