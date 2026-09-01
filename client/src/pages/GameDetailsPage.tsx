import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import type { GameDetails, GameScreenshot } from '../types/games.types';
import { fetchGameDetails, fetchGamesScreenshots } from '../api/games';

import Loader from '../components/common/Loader';
import ModalScreenshot from '../components/modal/ModalScreenshot';
import Screenshots from '../components/sections/Screenshots';
import GamePageHero from '../components/sections/GamePageHero';
import axios from 'axios';

const GameDetailsPage = () => {
    const [game, setGame] = useState<GameDetails | null>(null);
    const [loader, setLoader] = useState(true);
    const [screenshots, setScreenshots] = useState<GameScreenshot[]>([]);
    const [isModal, setIsModal] = useState<boolean>(false);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [error, setError] = useState<string>('');
    const { id } = useParams();

    useEffect(() => {
        if (!id) return;

        const getGame = async () => {
            setLoader(true);
            setError('');
            try {
                const [resGame, resScreen] = await Promise.all([
                    fetchGameDetails(`${id}`),
                    fetchGamesScreenshots(`${id}`),
                ]);

                if (resGame) {
                    setGame(resGame);
                }

                if (resScreen) {
                    setScreenshots(resScreen);
                }
            } catch (err) {
                let errorMessage = 'Error retrieving game data';
                if (axios.isAxiosError(err)) {
                    errorMessage =
                        err.response?.data.message ||
                        'An unknown error occurred';
                }
                setError(errorMessage);
            } finally {
                setLoader(false);
            }
        };
        getGame();
    }, [id]);

    const handleModal = (index: number) => {
        setIsModal(true);
        setActiveIndex(index);
    };

    return (
        <div className="game-page">
            {loader && <Loader gamePage={true} />}
            {error && <div className="error-banner">{error}</div>}
            {!loader && !error && game && (
                <>
                    <GamePageHero game={game} />
                    <div className="game-page__content">
                        <Screenshots
                            screenshots={screenshots}
                            game={game}
                            handleModal={handleModal}
                        />
                        <div className="game-page__main-grid">
                            <div className="game-page__description">
                                <h3 className="game-page__section-title">
                                    About the Game
                                </h3>
                                <p className="game-page__text">
                                    {game.description_raw}
                                </p>
                            </div>
                            <aside className="game-page__details-sidebar">
                                <h3 className="game-page__section-title">
                                    Details
                                </h3>
                                <div className="game-page__detail-box">
                                    {game.metacritic && (
                                        <div className="game-page__detail-item metacritic">
                                            <span className="game-page__detail-label">
                                                Metascore:
                                            </span>
                                            <span
                                                className={`game-page__meta-badge ${game.metacritic >= 75 ? 'good' : 'mixed'}`}
                                            >
                                                {game.metacritic}
                                            </span>
                                        </div>
                                    )}
                                    <div className="game-page__detail-item">
                                        <span className="game-page__detail-label">
                                            Platforms:
                                        </span>
                                        <span className="game-page__detail-value">
                                            {game.platforms
                                                ?.map(p => p.platform.name)
                                                .join(', ')}
                                        </span>
                                    </div>
                                    <div className="game-page__detail-item">
                                        <span className="game-page__detail-label">
                                            Developer:
                                        </span>
                                        <span className="game-page__detail-value">
                                            {game.developers
                                                ?.map(d => d.name)
                                                .join(', ')}
                                        </span>
                                    </div>
                                    <div className="game-page__detail-item">
                                        <span className="game-page__detail-label">
                                            Publisher:
                                        </span>
                                        <span className="game-page__detail-value">
                                            {game.publishers
                                                ?.map(p => p.name)
                                                .join(', ')}
                                        </span>
                                    </div>
                                    {game.website && (
                                        <div className="game-page__detail-item">
                                            <span className="game-page__detail-label">
                                                Website:
                                            </span>
                                            <a
                                                href={game.website}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="game-page__link"
                                            >
                                                Visit official site →
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </aside>
                        </div>
                    </div>
                </>
            )}
            {!loader && !game && (
                <p className="game-page__loader-text">Game not found</p>
            )}
            {isModal && (
                <ModalScreenshot
                    isModal={isModal}
                    setIsModal={setIsModal}
                    activeIndex={activeIndex}
                    screenshots={screenshots}
                />
            )}
        </div>
    );
};

export default GameDetailsPage;
