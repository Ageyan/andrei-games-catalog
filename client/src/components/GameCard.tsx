import type { Game } from '../types/games.types';
import { Link } from 'react-router-dom';
import { FaRegStar, FaStar } from 'react-icons/fa';

interface GameCardProps {
    game: Game;
    toggleFavorite: (game: Game) => void;
    isFavorite: boolean;
}

const GameCard = ({ game, toggleFavorite, isFavorite }: GameCardProps) => {
    const handleLikeClick = (event: React.MouseEvent) => {
        event.preventDefault();
        toggleFavorite(game);
    };

    return (
        <Link to={`/game/${game.id}`} className="game-card">
            <button className="game-card__like-btn" onClick={handleLikeClick}>
                {isFavorite ? <FaStar /> : <FaRegStar />}
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
