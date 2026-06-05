import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchGameDetails, fetchGamesScreenshots } from "../api/games";
import type { GameDetails, GameScreenshot } from "../types/games.types";
import { Swiper, SwiperSlide} from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const GameDetailsPage = () => {
    const [game, setGame] = useState<GameDetails | null>(null);
    const [loader, setLoader] = useState(false);
    const [screenshots, setScreenshots] = useState<GameScreenshot[]>([]);
    const [isModal, setIsModal] = useState<boolean>(false);
    const [activeSrc, setActiveSrc] = useState<string>('');
    const { id } = useParams();

    useEffect(() => {
        if (!id) return;

        const getGame = async() => {
            setLoader(true)
            try {
                const res = await fetchGameDetails(`${id}`);
                const res2 = await fetchGamesScreenshots(`${id}`);

                if(res) {
                    setGame(res)
                }

                if(res2) {
                    setScreenshots(res2)
                }
                
            } catch(e) {
                console.error(e)
            } finally {
                setLoader(false)
            }
        };
        getGame()
    }, [id])

    const handleModal = (src: string ) => {
        setIsModal(true);
        setActiveSrc(src);
    }

    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            setIsModal(false)
        }
    };

    return (
        <>
            <div className="game-page">
                {loader && <p className="game-page__loader-text">Game page loading...</p>}
                {!loader && game && (
                    <>
                        <section 
                            className="game-page__hero" 
                            style={{ backgroundImage: `url(${game.background_image})` }}
                        >
                            <div className="game-page__hero-overlay">
                                <div className="game-page__hero-container">
                                    <Link to='/' className="game-page__back-btn">
                                        <span>← Back to Catalog</span>
                                    </Link>
                                    <div className="game-page__hero-info">
                                        <div className="game-page__genres">
                                            {game.genres.map(genre => (
                                                <span key={genre.id} className="game-page__genre-badge">
                                                    {genre.name}
                                                </span>
                                            ))}
                                        </div>
                                        <h1 className="game-page__title">{game.name}</h1>
                                        <div className="game-page__meta">
                                            <span className="game-page__meta-item">📅 {game.released}</span>
                                            <span className="game-page__meta-item">⭐ {game.rating} / 5</span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </section>
                        <div className="game-page__content">
                            <div className="game-page__screenshots-section">
                                <h3 className="game-page__section-title">Screenshots</h3>
                                {screenshots.length > 0 ? (<Swiper
                                    modules={[Navigation, Pagination]}
                                    navigation={true}
                                    pagination={{ clickable: true }}
                                    spaceBetween={20}
                                    slidesPerView={3}
                                    breakpoints={{
                                        320: { slidesPerView: 1 },
                                        768: { slidesPerView: 2 },
                                        1200: { slidesPerView: 3 }
                                    }}
                                    className="game-page__swiper"
                                >
                                    {screenshots.map(screenshot => (
                                        <SwiperSlide key={screenshot.id}>
                                            <div className="game-page__slide-inner">
                                                <img
                                                    onClick={() => handleModal(screenshot.image)} 
                                                    src={screenshot.image} 
                                                    alt={`Скріншот з гри ${game.name}`}
                                                    className="game-page__screenshot-img"
                                                />
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>) : (<p className="loader-text">Завантаження скріншотів...</p>)}
                            </div>
                            <div className="game-page__main-grid">
                                <div className="game-page__description">
                                    <h3 className="game-page__section-title">About the Game</h3>
                                    <p className="game-page__text">{game.description_raw}</p>
                                </div>
                                <aside className="game-page__details-sidebar">
                                    <h3 className="game-page__section-title">Details</h3>
                                    <div className="game-page__detail-box">
                                        {game.metacritic && (
                                            <div className="game-page__detail-item metacritic">
                                                <span className="game-page__detail-label">Metascore:</span>
                                                <span className={`game-page__meta-badge ${game.metacritic >= 75 ? 'good' : 'mixed'}`}>
                                                    {game.metacritic}
                                                </span>
                                            </div>
                                        )}
                                        <div className="game-page__detail-item">
                                            <span className="game-page__detail-label">Platforms:</span>
                                            <span className="game-page__detail-value">
                                                {game.platforms?.map(p => p.platform.name).join(', ')}
                                            </span>
                                        </div>
                                        <div className="game-page__detail-item">
                                            <span className="game-page__detail-label">Developer:</span>
                                            <span className="game-page__detail-value">
                                                {game.developers?.map(d => d.name).join(', ')}
                                            </span>
                                        </div>
                                        <div className="game-page__detail-item">
                                            <span className="game-page__detail-label">Publisher:</span>
                                            <span className="game-page__detail-value">
                                                {game.publishers?.map(p => p.name).join(', ')}
                                            </span>
                                        </div>
                                        {game.website && (
                                            <div className="game-page__detail-item">
                                                <span className="game-page__detail-label">Website:</span>
                                                <a href={game.website} target="_blank" rel="noreferrer" className="game-page__link">
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

                {!loader && !game && <p className="game-page__loader-text">Game not found</p>}
            </div>

            {isModal && (
                <div onClick={handleBackdropClick} className={`backdrop ${isModal ? '' : 'is-hidden'}`}>
                    <div className="modal">
                        <img className="modal__img" src={activeSrc} alt='Game screenshot'/>
                        <button className="modal__btn-close" onClick={() => setIsModal(false)}>X</button>
                    </div>
                </div>
            )}
        </>
    )
};

export default GameDetailsPage;
