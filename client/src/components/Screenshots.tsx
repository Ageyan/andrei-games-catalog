import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import type { GameDetails, GameScreenshot } from '../types/games.types';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface ScreenshotsProps {
    screenshots: GameScreenshot[];
    game: GameDetails;
    handleModal: (index: number) => void;
}

const Screenshots = ({ screenshots, game, handleModal }: ScreenshotsProps) => {
    return (
        <div className="screenshots-section">
            <h3 className="screenshots-section__title">Screenshots</h3>
            {screenshots.length > 0 ? (
                <Swiper
                    modules={[Navigation, Pagination]}
                    navigation={true}
                    pagination={{ clickable: true }}
                    spaceBetween={20}
                    slidesPerView={3}
                    breakpoints={{
                        320: { slidesPerView: 1 },
                        600: { slidesPerView: 2 },
                        // 768: { slidesPerView: 2 },
                        1200: { slidesPerView: 3 },
                    }}
                    className="screenshots-section__swiper"
                >
                    {screenshots.map((screenshot, index) => (
                        <SwiperSlide key={screenshot.id}>
                            <div className="screenshots-section__slide-inner">
                                <img
                                    onClick={() => handleModal(index)}
                                    src={screenshot.image}
                                    alt={`Screenshot from the game ${game.name}`}
                                    className="screenshots-section__img"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
                <p className="loader-text">
                    The game does not contain screenshots
                </p>
            )}
        </div>
    );
};

export default Screenshots;
