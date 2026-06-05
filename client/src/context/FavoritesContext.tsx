import { useState, useEffect, createContext, type ReactNode, useContext } from 'react';
import { getFavoriteGames, deleteFavoriteGame, addFavoriteGame } from '../api/gamesFavorites';
import type { Game, FavoriteGame } from '../types/games.types';

interface FavoriteContext {
    favorites: FavoriteGame[];
    loader: boolean;
    toggleFavorite: (game: Game) => Promise<void>;
    deleteFavorite: (game: FavoriteGame) => Promise<void>;
};

const FavoriteContext = createContext<FavoriteContext | null>(null);

export const FavoriteProvider = ( { children } : { children : ReactNode } ) => {
    const [favorites, setFavorites] = useState<FavoriteGame[]>([]);
    const [loader, setLoader] = useState<boolean>(false);

    useEffect(() => {
        const getFavGames = async() => {
            setLoader(true)
            try {
                const res = await getFavoriteGames();
                setFavorites(res);
            } catch(e) {
                console.error(e);
            } finally {
                setLoader(false)
            }
        };

        getFavGames();
    }, []);

    const toggleFavorite = async(game : Game): Promise<void> => {
        if(favorites.some(g => g.id === game.id)) {
            try {
                await deleteFavoriteGame(game.id);
                setFavorites(prev => prev.filter(g => g.id !== game.id))
            } catch (e) {
                console.error('Не вдалося видалити гру', e)
            }
        } else {
            try {
                await addFavoriteGame(game);
                setFavorites(prev => [...prev, game]);
            } catch (e) {
                console.error('Не вдалося зберегти гру', e)
            }
        };
    };

    const deleteFavorite = async(game: FavoriteGame): Promise<void> => {
        if(favorites.some(g => g.id === game.id)) {
            try {
                await deleteFavoriteGame(game.id);
                setFavorites(prev => prev.filter(g => g.id !== game.id))
            } catch (e) {
                console.error('Не вдалося видалити гру', e)
            }
        };
    };

    return (
        <FavoriteContext.Provider value={{favorites, loader, toggleFavorite, deleteFavorite}}>
            {children}
        </FavoriteContext.Provider>
    )
};

export const useFavorite = () => {
    const context = useContext(FavoriteContext);

    if(!context) {
        throw new Error('useFavorite must be used inside FavoriteProvider')
    }

    return context;
};
