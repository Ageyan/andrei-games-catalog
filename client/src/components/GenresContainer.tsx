interface GenresContainerProps {
    selectedGenre: string;
    setSelectedGenre: React.Dispatch<React.SetStateAction<string>>;
    setPage: React.Dispatch<React.SetStateAction<number>>;
}

const genres = [
    {
        id: 1,
        name: 'All',
        genre: '',
        alt: 'Усі ігрі',
        src: 'https://www.overclockers.ua/content/reviews/games/games-summary-2025/01-games-summary-2025.jpg',
    },
    {
        id: 2,
        name: 'Action',
        genre: 'action',
        alt: 'Екшн ігри',
        src: 'https://t.games.gg/cdn-cgi/image/width=1920,quality=75,format=auto,fit=scale-down,metadata=none,onerror=redirect/https://assets.games.gg/Best_Action_Games_2026_157b3368ce.jpg',
    },
    {
        id: 3,
        name: 'Indie',
        genre: 'indie',
        alt: 'Інді ігри',
        src: 'https://games.gg/cdn-cgi/image/width=1920,quality=75,format=auto,fit=scale-down,metadata=none,onerror=redirect/https://assets.games.gg/Hollow_Knight_Silksong_Launch_Crashes_0e4abdb781.png',
    },
    {
        id: 4,
        name: 'Adventure',
        genre: 'adventure',
        alt: 'Пригодницькі ігри',
        src: 'https://t.games.gg/cdn-cgi/image/width=1920,quality=75,format=auto,fit=scale-down,metadata=none,onerror=redirect/https://assets.games.gg/best_adventure_games_a5026da1a4.jpg',
    },
    {
        id: 5,
        name: 'RPG',
        genre: 'role-playing-games-rpg',
        alt: 'РПГ ігри',
        src: 'https://t.games.gg/cdn-cgi/image/width=1920,quality=75,format=auto,fit=scale-down,metadata=none,onerror=redirect/https://assets.games.gg/Best_RPG_Games_6772e2308e.jpg',
    },
    {
        id: 6,
        name: 'Strategy',
        genre: 'strategy',
        alt: 'Стратегічні ігри',
        src: 'https://t.games.gg/cdn-cgi/image/width=1920,quality=75,format=auto,fit=scale-down,metadata=none,onerror=redirect/https://assets.games.gg/Best_Strategy_Games_7613ad737b.jpg',
    },
    {
        id: 7,
        name: 'Shooter',
        genre: 'shooter',
        alt: 'Шутерні ігри',
        src: 'https://games.gg/cdn-cgi/image/width=1920,quality=75,format=auto,fit=scale-down,metadata=none,onerror=redirect/https://assets.games.gg/best_shooter_games_84c2fb877f.jpg',
    },
    {
        id: 8,
        name: 'Racing',
        genre: 'racing',
        alt: 'Гоночні ігри',
        src: 'https://t.games.gg/cdn-cgi/image/width=1920,quality=75,format=auto,fit=scale-down,metadata=none,onerror=redirect/https://assets.games.gg/Best_Racing_Games_8a59504a25.webp',
    },
    {
        id: 9,
        name: 'Sports',
        genre: 'sports',
        alt: 'Спортивні ігри',
        src: 'https://games.gg/cdn-cgi/image/width=1920,quality=75,format=auto,fit=scale-down,metadata=none,onerror=redirect/https://assets.games.gg/Best_Sports_Games_ae5683e823.jpg',
    },
    {
        id: 10,
        name: 'Fighting',
        genre: 'fighting',
        alt: 'Файтингові ігри',
        src: 'https://t.games.gg/cdn-cgi/image/width=1920,quality=75,format=auto,fit=scale-down,metadata=none,onerror=redirect/https://assets.games.gg/fighting_ames_bf3b95be0b.jpg',
    },
];

const GenresContainer = ({
    selectedGenre,
    setSelectedGenre,
    setPage,
}: GenresContainerProps) => {
    return (
        <div className="genres-container">
            {genres.map(g => (
                <div
                    className={`genres-container__item ${selectedGenre === g.genre ? 'active' : ''}`}
                    key={g.id}
                    onClick={() => {
                        setSelectedGenre(`${g.genre}`);
                        setPage(1);
                    }}
                >
                    <img
                        className="genres-container__img"
                        alt={g.alt}
                        src={g.src}
                    />
                    <p className="genres-container__title">{g.name}</p>
                </div>
            ))}
        </div>
    );
};

export default GenresContainer;
