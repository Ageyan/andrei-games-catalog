import { Link } from 'react-router-dom';

import { useFavorite } from '../context/FavoritesContext';

import { MdDelete } from 'react-icons/md';

interface FeaturedGamesListProps {
    customClass: string;
    setIsAuthModal: React.Dispatch<React.SetStateAction<boolean>>;
    setIsDrawerOpen?: (arg: boolean) => void;
}

const FeaturedGamesList = ({
    customClass,
    setIsAuthModal,
    setIsDrawerOpen,
}: FeaturedGamesListProps) => {
    const {
        favorites,
        loader: favLoader,
        deleteFavorite,
        isAuthenticated,
    } = useFavorite();

    const handleAuth = () => {
        setTimeout(() => {
            setIsAuthModal(true);
        }, 700);
    };

    return (
        <div className={customClass}>
            <h3 className="featured-container__title">Featured games</h3>
            {!isAuthenticated && (
                <div className="featured-container__unauth">
                    <p className="featured-container__unauth-text">
                        Log in to create your own list of favorite games.
                    </p>
                    <button
                        className="featured-container__sign-in-btn"
                        onClick={() => {
                            setIsDrawerOpen?.(false);
                            handleAuth();
                        }}
                    >
                        Sign in
                    </button>
                </div>
            )}
            {isAuthenticated && favLoader && (
                <p className="featured-container__text">
                    Featured games are loading...
                </p>
            )}
            {isAuthenticated && !favLoader && favorites.length === 0 && (
                <p className="featured-container__text">
                    Your list is empty. Add some games!
                </p>
            )}
            {isAuthenticated && !favLoader && favorites.length > 0 && (
                <ul className="featured-container__list">
                    {favorites.map(game => (
                        <Link to={`/game/${game.id}`} key={game.id}>
                            <li className="featured-container__item">
                                <img
                                    className="featured-container__item-img"
                                    src={game.background_image}
                                    alt={game.name}
                                />
                                <p className="featured-container__item-text">
                                    {game.name}
                                </p>
                                <button
                                    className="featured-container__item-btn-del"
                                    onClick={(
                                        event: React.MouseEvent<HTMLButtonElement>,
                                    ) => {
                                        event.preventDefault();
                                        deleteFavorite(game);
                                    }}
                                >
                                    <MdDelete className="featured-container__item-btn-del-icon" />
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
