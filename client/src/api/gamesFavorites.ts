import type { FavoriteGame } from '../types/games.types';
import api from './api';

export const getFavoriteGames = async(): Promise<FavoriteGame[]> => {
    const { data } = await api.get<FavoriteGame[]>('/api/favorites');
    return data;
};

export const addFavoriteGame = async(game : FavoriteGame): Promise<FavoriteGame> => {
    const { data } = await api.post<FavoriteGame>('/api/favorites', game);
    return data;
};

export const deleteFavoriteGame = async(id : number): Promise<void> => {
    await api.delete(`/api/favorites/${id}`);
};