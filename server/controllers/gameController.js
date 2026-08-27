import FavoriteGame from "../models/Game.js";

export const addFavoriteGame = async (req, res) => {
    const { id, name, background_image, rating, released } = req.body;
    const userId = req.user?.userId;

    try {
        const existingGame = await FavoriteGame.findOne({ id: id, user: userId });

        if (existingGame) {
            return res.status(400).json({ message: 'This game is already in your favorites' });
        }

        const gameObj = {
            id,
            name,
            background_image,
            rating,
            released
        }

        const game = await FavoriteGame.create({ ...gameObj, user: userId })

        return res.status(201).json(game);
    } catch(err) {
        console.error('Failed to added the game', err);
        res.status(500).json({ message: 'Failed server to added the game' });
    }
};

export const getFavoriteGames = async (req, res) => {
    const userId = req.user?.userId;
    try {
        const games = await FavoriteGame.find({user: userId});

        return res.status(200).json(games);
    } catch(err) {
        console.error('Failed to get favorite games:', err);
        res.status(500).json({ message: 'Failed server to get favorite games' });
    }
};

export const deleteFavoriteGame = async (req, res) => {
    const { id } = req.params;
    const userId = req.user?.userId;
    try {
        const game = await FavoriteGame.findOneAndDelete({id : id, user: userId});

        if(!game) {
            return res.status(404).json({message: 'Game not found'})
        }

        return res.status(200).json({message: 'Game delete successfully'})
    } catch(err) {
        console.error('Failed to deleted the game', err);
        res.status(500).json({ message: 'Failed server to deleted the game' });
    }
};


