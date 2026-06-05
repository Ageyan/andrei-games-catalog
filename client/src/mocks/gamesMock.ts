import type { Game } from '../types/games.types';

export const mockGames: Game[] = [
    {
        id: 123,
        name: 'The Witcher 3: Wild Hunt',
        released: '2015-05-19',
        background_image: 'https://media.rawg.io/witcher',
        rating: 4.67,
        genres: [
            { id: 4, name: 'Action' },
            { id: 5, name: 'RPG' },
        ],
        platforms: [
            { platform: { id: 4, name: 'PC' } },
            { platform: { id: 18, name: 'PlayStation 4' } },
        ],
    },
    {
        id: 145,
        name: 'Spider-Man',
        released: '2019-03-22',
        background_image: 'https://media.rawg.io/spider-man',
        rating: 4.88,
        genres: [
            { id: 4, name: 'Action' },
            { id: 7, name: 'Fight' },
        ],
        platforms: [
            { platform: { id: 4, name: 'PC' } },
            { platform: { id: 18, name: 'PlayStation 4' } },
        ],
    },
    {
        id: 1789,
        name: 'Stalker',
        released: '2009-09-04',
        background_image: 'https://media.rawg.io/stalker',
        rating: 4.91,
        genres: [
            { id: 4, name: 'Action' },
            { id: 5, name: 'RPG' },
        ],
        platforms: [
            { platform: { id: 4, name: 'PC' } },
            { platform: { id: 18, name: 'PlayStation 4' } },
        ],
    },
];
