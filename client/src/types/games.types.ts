interface Platform {
    id: number;
    name: string;
    slug: string;
};

interface Genre {
    id: number;
    name: string;
    slug: string;
};

interface GamePlatform {
    platform: Platform;
};

interface Company {
    id: number;
    name: string;
    slug: string;
}

export interface GameScreenshot {
    id: number;
    image: string;
};

export interface Game {
    id: number;
    name: string;
    background_image: string;
    rating: number;
    released: string;
    genres: Genre[];
    platforms: GamePlatform[];
};

export interface GameDetails extends Game {
    description_raw: string;
    metacritic?: number;
    developers?: Company[];
    publishers?: Company[];
    website?: string;
};

export interface FavoriteGame {
    id: number;
    name: string;
    background_image: string;
    rating: number;
    released: string;
};
