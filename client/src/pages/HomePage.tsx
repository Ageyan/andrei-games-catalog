import React, { useState, useEffect } from 'react';
import axios from 'axios';

import type { Game } from '../types/games.types';
import { useFavorite } from '../context/FavoritesContext';
import { fetchGames } from '../api/games';

import GameCard from '../components/GameCard';
import FeaturedGamesList from '../components/FeaturedGamesList';
import Drawer from '../components/Drawer';
import GenresContainer from '../components/GenresContainer';
import SortContainer from '../components/SortContainer';
import Toast from '../components/Toast';
import Loader from '../components/Loader';

import { FaStar } from 'react-icons/fa';
import { useDebounce } from '../hooks/useDebounce';
import HomeHeroSection from '../components/HomeHeroSection';

const HomePage = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [loader, setLoader] = useState<boolean>(true);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedGenre, setSelectedGenre] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<string>('');
    const [page, setPage] = useState<number>(1);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const { favorites, toggleFavorite, toast, setToast } = useFavorite();
    const debounceSearchTerm = useDebounce(searchTerm, 500);

    useEffect(() => {
        setLoader(true);
        setError('');

        const getGames = async () => {
            try {
                const res = await fetchGames(
                    debounceSearchTerm,
                    selectedGenre,
                    sortOrder,
                    page,
                );

                if (page === 1) {
                    setGames(res);
                } else {
                    setGames(prev => [...prev, ...res]);
                }
            } catch (err) {
                let errorMessage = 'Failed to load game list';

                if (axios.isAxiosError(err)) {
                    errorMessage =
                        err.response?.data.message ||
                        'An unknown error occurred';
                } else {
                    console.error('An unknown error occurred', err);
                }

                setError(errorMessage);
            } finally {
                setLoader(false);
            }
        };
        getGames();
    }, [debounceSearchTerm, selectedGenre, sortOrder, page]);

    useEffect(() => {
        const closeSelect = () => setIsOpen(false);
        if (isOpen) window.addEventListener('click', closeSelect);
        return () => window.removeEventListener('click', closeSelect);
    }, [isOpen]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPage(1);
        setSearchTerm(event.target.value);
    };

    return (
        <div className="home-page">
            <HomeHeroSection
                searchTerm={searchTerm}
                handleSearch={handleSearch}
            />
            <div className="home-page__container">
                <GenresContainer
                    selectedGenre={selectedGenre}
                    setSelectedGenre={setSelectedGenre}
                    setPage={setPage}
                />
                <div className="home-page__main-layout">
                    <aside>
                        <SortContainer
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}
                            sortOrder={sortOrder}
                            setSortOrder={setSortOrder}
                            setPage={setPage}
                        />
                        <div
                            onClick={() => setIsDrawerOpen(true)}
                            className="home-page__favorite-btn-div"
                        >
                            <FaStar className="home-page__favorite-btn-icon" />
                        </div>
                        <FeaturedGamesList customClass="home-page__favorites-container" />
                    </aside>
                    <div className="home-page__main-content">
                        <div className="home-page__game-list">
                            {error && (
                                <div className="error-banner">{error}</div>
                            )}
                            {!loader && !error && games.length === 0 && (
                                <p className="empty-state">
                                    Games not found...
                                </p>
                            )}
                            {!error &&
                                games.map(game => (
                                    <GameCard
                                        key={game.id}
                                        game={game}
                                        toggleFavorite={toggleFavorite}
                                        isFavorite={favorites.some(
                                            fav => fav.id === game.id,
                                        )}
                                    />
                                ))}

                            {loader && <Loader />}
                        </div>
                        {!loader && !error && games.length > 0 && (
                            <div className="home-page__pagination">
                                <button
                                    className="show-btn"
                                    onClick={() => setPage(prev => prev + 1)}
                                >
                                    Show more games...
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Drawer
                customClass="drawer__favorites-container"
                isDrawerOpen={isDrawerOpen}
                setIsDrawerOpen={setIsDrawerOpen}
            />
            <Toast
                show={toast.show}
                message={toast.message}
                type={toast.type}
                onClose={() => setToast(prev => ({ ...prev, show: false }))}
            />
        </div>
    );
};

export default HomePage;
