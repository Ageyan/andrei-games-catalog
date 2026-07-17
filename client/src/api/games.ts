import type { Game, GameDetails, GameScreenshot } from '../types/games.types';

export const fetchGames = async (searchQuery : string='', genreSlug: string='', sortOrder: string='', page: number=1): Promise<Game[]> => {
    try {
        const searchPart = searchQuery ? `&search=${searchQuery}` : '';
        const genrePart = genreSlug ? `&genres=${genreSlug}` : '';
        const sortPart = sortOrder ? `&ordering=${sortOrder}` : '';
        const pagePart = page ? `&page=${page}` : '';

        const response = await fetch(
            `https://api.rawg.io/api/games?key=${import.meta.env.VITE_RAWG_API_KEY}${searchPart}${genrePart}${sortPart}${pagePart}`,
        );

        if (!response.ok) {
            throw new Error('Помилка під час завантаження даних із сервера');
        }

        const data = await response.json();
        return data.results;
    } catch (e) {
        console.error('Помилка в fetchGames', e);
        return [];
    }
};

export const fetchGamesScreenshots = async(id : string): Promise<GameScreenshot[]> => {
    try {
        const response = await fetch(`https://api.rawg.io/api/games/${id}/screenshots?key=${import.meta.env.VITE_RAWG_API_KEY}`);

        if(!response.ok) {
            throw new Error('Помилка під час завантаження даних із сервера');
        }

        const data = await response.json();
        return data.results;
    } catch(e) {
        console.error('Помилка в fetchGamesScreenshots', e);
        return [];
    }
}

export const fetchGameDetails = async(id : string): Promise<GameDetails | undefined>  => {
    try {
        const response = await fetch(`https://api.rawg.io/api/games/${id}?key=${import.meta.env.VITE_RAWG_API_KEY}`);

        if(!response.ok) {
            throw new Error('Помилка під час завантаження даних із сервера');
        }

        const data = await response.json();
        return data;
    } catch(e) {
        console.error('Помилка в fetchGameDetails', e)
        return undefined;
    }
};

// Інший варіант синтаксису
// export const fetchGames = async (searchQuery: string = '', genreSlug: string = ''): Promise<Game[]> => {
//     const params = new URLSearchParams({
//         key: import.meta.env.VITE_RAWG_API_KEY,
//     });

//     if (searchQuery) params.append('search', searchQuery);
//     if (genreSlug) params.append('genres', genreSlug); // Добавляем жанр в запрос

//     const url = `https://api.rawg.io/api/games?${params.toString()}`;
//     // ... логіка fetch
// }




