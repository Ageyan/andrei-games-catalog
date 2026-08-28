import { useModalClose } from '../hooks/useModalClose';

interface ModalScreenshotProps {
    isModal: boolean;
    setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
    activeSrc: string;
}

export const ModalScreenshot = ({
    isModal,
    setIsModal,
    activeSrc,
}: ModalScreenshotProps) => {
    useModalClose(isModal, () => setIsModal(false));

    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            setIsModal(false);
        }
    };

    return (
        <div
            onClick={handleBackdropClick}
            className={`backdrop ${isModal ? '' : 'is-hidden'}`}
        >
            <div className="modal">
                <img
                    className="modal__img"
                    src={activeSrc}
                    alt="Game screenshot"
                />
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
