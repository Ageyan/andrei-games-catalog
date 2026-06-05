import { useFavorite } from '../context/FavoritesContext';
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';

interface FeaturedGamesListProps {
    customClass: string
}

const FeaturedGamesList = ({ customClass } : FeaturedGamesListProps) => {

    const {favorites, loader : favLoader, deleteFavorite} = useFavorite();

    return (
        <div className={customClass}>
            <h3 className="home-page__favorite-title">Featured games</h3>
            <ul className="home-page__favorite-list">
                {favLoader&&<p style={{fontSize: '1rem'}}>Featured games are loading...</p>}
                {!favLoader&&favorites.map(game => (
                    <Link to={`/game/${game.id}`} key={game.id}> 
                        <li className='home-page__favorite-item'>
                            <img className='home-page__favorite-item-img' src={game.background_image} alt={game.name}/>
                            <p className='home-page__favorite-item-text'>{game.name}</p>
                            <button className='home-page__favorite-item-btn-del' onClick={(event: React.MouseEvent) => {
                                event.preventDefault();
                                deleteFavorite(game);
                            }}><MdDelete className='home-page__favorite-item-btn-del-icon'/></button>
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    )
}

export default FeaturedGamesList;

