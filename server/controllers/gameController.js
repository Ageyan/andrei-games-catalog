import FavoriteGame from "../models/Game.js";

export const addFavoriteGame = async(req, res) => {
    try {
        const { id, name, background_image, rating, released} = req.body;

        const gameObj = {
            id,
            name,
            background_image,
            rating,
            released
        }

        const newGame = new FavoriteGame(gameObj);

        const game = await newGame.save();

        return res.status(201).json(game);
    } catch(e) {
        res.status(400).json({ message: 'Failed to added the game' })
    }
};

export const getFavoriteGames = async(req, res) => {
    try {
        const games = await FavoriteGame.find();

        return res.status(200).json(games);
    } catch(e) {
        res.status(400).json({message: 'Failed to get favorite games'})
    }
};

export const deleteFavoriteGame = async(req,res) => {
    try {
        const { id } = req.params;

        const game = await FavoriteGame.findOneAndDelete({id : id});

        if(!game) {
            return res.status(404).json({message: 'Game not found'})
        }

        return res.status(200).json({message: 'Game delete successfully'})
    } catch(e) {
        console.log("Error details:", e.message);
        res.status(400).json({message: 'Failed to deleted the game'})
    }
};


