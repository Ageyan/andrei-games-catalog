import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import type { GameScreenshot } from '../../types/games.types';
import { useModalClose } from '../../hooks/useModalClose';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface ModalScreenshotProps {
    isModal: boolean;
    setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
    activeIndex: number;
    screenshots: GameScreenshot[];
}

export const ModalScreenshot = ({
    isModal,
    setIsModal,
    activeIndex,
    screenshots,
}: ModalScreenshotProps) => {
    useModalClose(isModal, () => setIsModal(false));

    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            setIsModal(false);
        }
    };

    return (
        <div onClick={handleBackdropClick} className="backdrop">
            <div className="modal">
                <Swiper
                    modules={[Navigation, Pagination]}
                    navigation={true}
                    pagination={{ clickable: true }}
                    initialSlide={activeIndex}
                    slidesPerView={1}
                    className="modal__swiper"
                >
                    {screenshots.map(screenshot => (
                        <SwiperSlide key={screenshot.id}>
                            <img
                                className="modal__img"
                                src={screenshot.image}
                                alt="Game screenshot"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <button
                    className="modal__btn-close"
                    onClick={() => setIsModal(false)}
                >
                    X
                </button>
            </div>
        </div>
    );
};

export default ModalScreenshot;
