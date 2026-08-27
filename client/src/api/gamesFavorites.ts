import type { FavoriteGame } from '../types/games.types';
import api from './api';

export const getFavoriteGames = async(): Promise<FavoriteGame[]> => {
    const { data } = await api.get<FavoriteGame[]>('/favorites');
    return data;
};

export const addFavoriteGame = async(game : FavoriteGame): Promise<FavoriteGame> => {
    const { data } = await api.post<FavoriteGame>('/favorites', game);
    return data;
};

export const deleteFavoriteGame = async(id : number): Promise<void> => {
    await api.delete(`/favorites/${id}`);
};