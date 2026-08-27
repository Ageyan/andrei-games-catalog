import mongoose from 'mongoose';

const gameSchema = mongoose.Schema(
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
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    }
);

const FavoriteGame = mongoose.model('FavoriteGame', gameSchema);

export default FavoriteGame;