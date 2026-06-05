import React, { useState, useEffect } from 'react';
import GameCard from '../components/GameCard';
import FeaturedGamesList from '../components/FeaturedGamesList';
import type { Game } from '../types/games.types';
import { fetchGames } from '../api/games';
import { useFavorite } from '../context/FavoritesContext';
import { IoIosArrowDown } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import Drawer from '../components/Drawer';

const HomePage = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [loader, setLoader] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedGenre, setSelectedGenre] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<string>('');
    const [page, setPage] = useState<number>(1);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    
    const { favorites, toggleFavorite } = useFavorite();

    const genres = [
        {id: 1, name: 'All', genre: '', alt: 'Усі ігрі', src: 'https://www.overclockers.ua/content/reviews/games/games-summary-2025/01-games-summary-2025.jpg'},
        {id: 2, name: 'Action', genre: 'action', alt: 'Екшн ігри', src: 'https://t.games.gg/cdn-cgi/image/width=1920,quality=75,format=auto,fit=scale-down,metadata=none,onerror=redirect/https://assets.games.gg/Best_Action_Games_2026_157b3368ce.jpg'},
        {id: 3, name: 'Indie', genre: 'indie', alt: 'Інді ігри', src: 'https://games.gg/cdn-cgi/image/width=1920,quality=75,format=auto,fit=scale-down,metadata=none,onerror=redirect/https://assets.games.gg/Hollow_Knight_Silksong_Launch_Crashes_0e4abdb781.png'},
        {id: 4, name: 'Adventure', genre: 'adventure', alt: 'Пригодницькі ігри', src: 'https://t.games.gg/cdn-cgi/image/width=1920,quality=75,format=auto,fit=scale-down,metadata=none,onerror=redirect/https://assets.games.gg/best_adventure_games_a5026da1a4.jpg'},
        {id: 5, name: 'RPG', genre: 'role-playing-games-rpg', alt: 'РПГ ігри', src: 'https://t.games.gg/cdn-cgi/image/width=1920,quality=75,format=auto,fit=scale-down,metadata=none,onerror=redirect/https://assets.games.gg/Best_RPG_Games_6772e2308e.jpg'},
        {id: 6, name: 'Strategy', genre: 'strategy', alt: 'Стратегічні ігри', src: 'https://t.games.gg/cdn-cgi/image/width=1920,quality=75,format=auto,fit=scale-down,metadata=none,onerror=redirect/https://assets.games.gg/Best_Strategy_Games_7613ad737b.jpg'},
        {id: 7, name: 'Shooter', genre: 'shooter', alt: 'Шутерні ігри', src: 'https://games.gg/cdn-cgi/image/width=1920,quality=75,format=auto,fit=scale-down,metadata=none,onerror=redirect/https://assets.games.gg/best_shooter_games_84c2fb877f.jpg'},
        {id: 8, name: 'Racing', genre: 'racing', alt: 'Гоночні ігри', src: 'https://t.games.gg/cdn-cgi/image/width=1920,quality=75,format=auto,fit=scale-down,metadata=none,onerror=redirect/https://assets.games.gg/Best_Racing_Games_8a59504a25.webp'},
        {id: 9, name: 'Sports', genre: 'sports', alt: 'Спортивні ігри', src: 'https://games.gg/cdn-cgi/image/width=1920,quality=75,format=auto,fit=scale-down,metadata=none,onerror=redirect/https://assets.games.gg/Best_Sports_Games_ae5683e823.jpg'},
        {id: 10, name: 'Fighting', genre: 'fighting', alt: 'Файтингові ігри', src: 'https://t.games.gg/cdn-cgi/image/width=1920,quality=75,format=auto,fit=scale-down,metadata=none,onerror=redirect/https://assets.games.gg/fighting_ames_bf3b95be0b.jpg'}
    ]

    useEffect(() => {
        const timeout = setTimeout(() => {
            const getGames = async () => {
                setLoader(true);
                try {
                    const res = await fetchGames(searchTerm, selectedGenre, sortOrder, page);

                    if(page === 1) {
                        setGames(res);
                    } else {
                        setGames(prev => [...prev, ...res])
                    }

                } catch (e) {
                    console.error(e);
                } finally {
                    setLoader(false);
                }
            };
            getGames();
        }, 800)

        return () => clearTimeout(timeout)
    }, [searchTerm, selectedGenre, sortOrder, page]);

    const handleSearch = (event : React.ChangeEvent<HTMLInputElement>) => {
        setPage(1);
        setSearchTerm(event.target.value);
    }

    const sorts = [
        {id: 1, name: 'Trending games', sort: ''},
        {id: 2, name: 'Max Rating', sort: '-rating'},
        {id: 3, name: 'Min Rating', sort: 'rating'}
    ]

    useEffect(() => {
        const closeSelect = () => setIsOpen(false);
        if (isOpen) window.addEventListener('click', closeSelect);
        return () => window.removeEventListener('click', closeSelect);
    }, [isOpen])

    return (
        <div className='home-page'>
            <section className='home-page__hero'>
                <h1 className='home-page__hero-title'>Games Catalog</h1>
                <input className='home-page__search-input' type='text' placeholder='Enter the name of the game...' value={searchTerm} onChange={handleSearch}/>
            </section>

            <div className='home-page__container'>
                <div className='home-page__genres-search'>
                    {genres.map(g => (
                        <div className='home-page__genre-item' key={g.id} onClick={() => {setSelectedGenre(`${g.genre}`); setPage(1)}}>
                            <img className='home-page__genre-img' alt={g.alt} src={g.src}/>
                            <p className='home-page__genre-title'>{g.name}</p>
                        </div>
                    ))}
                </div>
                <div className='home-page__main-layout'>
                    <aside>
                        <div className='home-page__sort'>
                            <div className='home-page__sort-container'
                            onClick={(e) => {
                                setIsOpen(!isOpen); 
                                e.stopPropagation();
                            }}
                            >
                                <span>
                                    {sorts.find(s => s.sort === sortOrder)?.name || sorts[0].name}
                                </span>
                                <IoIosArrowDown className={`home-page__sort-icon ${isOpen ? 'open' : ''}`}/>
                            </div>
                            {isOpen && (
                                <div className='home-page__sort-options'>
                                    {sorts.map(s => (
                                        <div key={s.id} className={`home-page__sort-option ${sortOrder === s.sort ? 'selected' : ''}`}
                                        onClick={() => {
                                            setPage(1);
                                            setSortOrder(s.sort);
                                            setIsOpen(false);
                                        }}>
                                            {s.name}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div onClick={() => setIsDrawerOpen(true)} className='home-page__favorite-btn-div'>
                            <FaStar className='home-page__favorite-btn-icon'/>
                        </div>
                        <FeaturedGamesList customClass='home-page__favorites-container'/>
                    </aside>
                    <main className='home-page__main-content'>
                        {loader && <p className="loader-text">Game list update...</p>}
                        {!loader && games.length === 0 && <p className="loader-text">Games not found...</p>}
                        <div className="home-page__game-list">
                            {games.map(game => (
                                <GameCard key={game.id} game={game} toggleFavorite={toggleFavorite} 
                                isFavorite={favorites.some(fav => fav.id === game.id)}/>
                            ))}
                        </div>   
                        {!loader && games.length > 0 && (
                            <div className="home-page__pagination">
                                <button className='show-btn' onClick={() => setPage(prev => prev + 1)}>Show more games...</button>
                            </div>
                        )}         
                    </main>
                </div>
            </div>
            <Drawer customClass='drawer__favorites-container' isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen}/>
        </div>
    );
};

export default HomePage;
