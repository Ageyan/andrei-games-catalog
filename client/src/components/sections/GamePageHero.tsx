import { useLocation, useNavigate } from 'react-router-dom';

import type { GameDetails } from '../../types/games.types';

interface GamePageHeroProps {
    game: GameDetails;
}

const GamePageHero = ({ game }: GamePageHeroProps) => {
    const location = useLocation();
    const navigate = useNavigate();
    const previousPath = location.state?.from;

    const handleIsBack = () => {
        if (previousPath) {
            navigate(-1);
        } else {
            navigate('/');
        }
    };

    return (
        <section
            className="game-page__hero"
            style={{
                backgroundImage: `url(${game.background_image})`,
            }}
        >
            <div className="game-page__hero-overlay">
                <div className="game-page__hero-container">
                    <button
                        className="game-page__back-btn"
                        onClick={handleIsBack}
                    >
                        <span>← Back to Catalog</span>
                    </button>
                    <div className="game-page__hero-info">
                        <div className="game-page__genres">
                            {game.genres.map(genre => (
                                <span
                                    key={genre.id}
                                    className="game-page__genre-badge"
                                >
                                    {genre.name}
                                </span>
                            ))}
                        </div>
                        <h1 className="game-page__title">{game.name}</h1>
                        <div className="game-page__meta">
                            <span className="game-page__meta-item">
                                📅 {game.released}
                            </span>
                            <span className="game-page__meta-item">
                                ⭐ {game.rating} / 5
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GamePageHero;
