import {
    useState,
    useEffect,
    createContext,
    type ReactNode,
    useContext,
} from 'react';
import axios from 'axios';

import {
    getFavoriteGames,
    deleteFavoriteGame,
    addFavoriteGame,
} from '../api/gamesFavorites';
import type { Game, FavoriteGame } from '../types/games.types';
import type { ToastState } from '../types/toast.types';

interface FavoriteContextProps {
    favorites: FavoriteGame[];
    loader: boolean;
    toggleFavorite: (game: Game) => Promise<void>;
    deleteFavorite: (game: FavoriteGame) => Promise<void>;
    setToast: React.Dispatch<React.SetStateAction<ToastState>>;
    toast: ToastState;
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    clearFavorites: () => void;
}

const FavoriteContext = createContext<FavoriteContextProps | null>(null);

export const FavoriteProvider = ({ children }: { children: ReactNode }) => {
    const [favorites, setFavorites] = useState<FavoriteGame[]>([]);
    const [loader, setLoader] = useState<boolean>(false);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
        !!localStorage.getItem('token'),
    );
    const [toast, setToast] = useState<ToastState>({
        show: false,
        message: '',
        type: 'success',
    });

    useEffect(() => {
        const getFavGames = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;

            setLoader(true);
            try {
                const res = await getFavoriteGames();
                setFavorites(res);
            } catch (e) {
                console.error(e);
            } finally {
                setLoader(false);
            }
        };

        getFavGames();
    }, [isAuthenticated]);

    const handleGameError = (error: unknown, defaultMessage: string) => {
        let errorMessage = defaultMessage;

        if (axios.isAxiosError(error)) {
            errorMessage =
                error.response?.data.message || 'An unknown error occurred';
        }

        setToast({
            show: true,
            message: errorMessage,
            type: 'error',
        });
    };

    const handleDeleteFavoriteGame = async (game: Game | FavoriteGame) => {
        setToast({ show: false, message: '', type: 'success' });

        try {
            await deleteFavoriteGame(game.id);
            setFavorites(prev => prev.filter(g => g.id !== game.id));
            setToast({
                show: true,
                message:
                    'The game has been successfully removed from favorites',
                type: 'success',
            });
        } catch (err) {
            handleGameError(err, 'Failed to remove game from list');
        }
    };

    const toggleFavorite = async (game: Game): Promise<void> => {
        const token = localStorage.getItem('token');

        if (!token) {
            setToast({
                show: true,
                message: 'Please log in to save games',
                type: 'error',
            });
            return;
        }

        if (favorites.some(g => g.id === game.id)) {
            await handleDeleteFavoriteGame(game);
        } else {
            try {
                setToast({ show: false, message: '', type: 'success' });
                await addFavoriteGame(game);
                setFavorites(prev => [...prev, game]);
                setToast({
                    show: true,
                    message:
                        'The game has been successfully added to your favorites.',
                    type: 'success',
                });
            } catch (err) {
                handleGameError(err, 'Failed to add game to list');
            }
        }
    };

    const deleteFavorite = async (game: FavoriteGame): Promise<void> => {
        if (favorites.some(g => g.id === game.id)) {
            await handleDeleteFavoriteGame(game);
        }
    };

    const clearFavorites = () => setFavorites([]);

    return (
        <FavoriteContext.Provider
            value={{
                favorites,
                loader,
                toggleFavorite,
                deleteFavorite,
                toast,
                setToast,
                isAuthenticated,
                setIsAuthenticated,
                clearFavorites,
            }}
        >
            {children}
        </FavoriteContext.Provider>
    );
};

export const useFavorite = () => {
    const context = useContext(FavoriteContext);

    if (!context) {
        throw new Error('useFavorite must be used inside FavoriteProvider');
    }

    return context;
};
