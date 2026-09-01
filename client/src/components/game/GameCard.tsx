import { Link, useLocation } from 'react-router-dom';

import type { Game } from '../../types/games.types';
import { useFavorite } from '../../context/FavoritesContext';

import { FaRegStar, FaStar } from 'react-icons/fa';

interface GameCardProps {
    game: Game;
    isFavorite: boolean;
}

const GameCard = ({ game, isFavorite }: GameCardProps) => {
    const { isAuthenticated, toggleFavorite } = useFavorite();
    const location = useLocation();

    const handleLikeClick = (event: React.MouseEvent) => {
        event.preventDefault();
        toggleFavorite(game);
    };

    return (
        <Link
            to={`/game/${game.id}`}
            state={{ from: location.pathname }}
            className="game-card"
        >
            <button className="game-card__like-btn" onClick={handleLikeClick}>
                {isFavorite && isAuthenticated ? <FaStar /> : <FaRegStar />}
            </button>
            <img
                className="game-card__image"
                src={game.background_image}
                alt={game.name}
            />
            <h2 className="game-card__title">{game.name}</h2>
            <p className="game-card__released">{game.released}</p>
            <p className="game-card__rating">{game.rating}</p>
            <div className="game-card__genre-container">
                {game.genres.map(genre => (
                    <span className="game-card__genre" key={genre.id}>
                        {genre.name}
                    </span>
                ))}
            </div>
        </Link>
    );
};

export default GameCard;
