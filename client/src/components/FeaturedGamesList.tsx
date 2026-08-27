import { Link } from 'react-router-dom';

import { useFavorite } from '../context/FavoritesContext';

import { MdDelete } from 'react-icons/md';

interface FeaturedGamesListProps {
    customClass: string;
    setIsAuthModal?: React.Dispatch<React.SetStateAction<boolean>>;
}

const FeaturedGamesList = ({
    customClass,
    setIsAuthModal,
}: FeaturedGamesListProps) => {
    const { favorites, loader: favLoader, deleteFavorite } = useFavorite();
    const isAuthentificated = !!localStorage.getItem('token');

    return (
        <div className={customClass}>
            <h3 className="home-page__favorite-title">Featured games</h3>
            <button onClick={() => setIsAuthModal?.(true)}>open modal</button>
            {!isAuthentificated && (
                <div className="home-page__favorite-unauth">
                    <p>Log in to create your own list of favorite games.</p>
                    <button
                        className="auth-btn"
                        onClick={() => setIsAuthModal?.(true)}
                    >
                        Log in / Register
                    </button>
                </div>
            )}
            {isAuthentificated && favLoader && (
                <p style={{ fontSize: '1rem' }}>
                    Featured games are loading...
                </p>
            )}
            {isAuthentificated && !favLoader && favorites.length === 0 && (
                <p style={{ fontSize: '1rem' }}>
                    Your list is empty. Add some games!
                </p>
            )}
            {isAuthentificated && !favLoader && favorites.length > 0 && (
                <ul className="home-page__favorite-list">
                    {favorites.map(game => (
                        <Link to={`/game/${game.id}`} key={game.id}>
                            <li className="home-page__favorite-item">
                                <img
                                    className="home-page__favorite-item-img"
                                    src={game.background_image}
                                    alt={game.name}
                                />
                                <p className="home-page__favorite-item-text">
                                    {game.name}
                                </p>
                                <button
                                    className="home-page__favorite-item-btn-del"
                                    onClick={(event: React.MouseEvent) => {
                                        event.preventDefault();
                                        deleteFavorite(game);
                                    }}
                                >
                                    <MdDelete className="home-page__favorite-item-btn-del-icon" />
                                </button>
                            </li>
                        </Link>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FeaturedGamesList;
