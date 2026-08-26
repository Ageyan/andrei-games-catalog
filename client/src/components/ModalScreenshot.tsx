interface ModalScreenshotProps {
    isModal: boolean;
    setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
    activeSrc: string;
    handleBackdropClick: (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => void;
}

export const ModalScreenshot = ({
    isModal,
    setIsModal,
    activeSrc,
    handleBackdropClick,
}: ModalScreenshotProps) => {
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
