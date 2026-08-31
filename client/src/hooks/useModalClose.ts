import { useEffect } from "react";

export const useModalClose = (isOpen: boolean, isClose: () => void) => {
    useEffect(() => {
        if (!isOpen) return;

        document.body.style.overflow = 'hidden';

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                isClose();
            }
        }

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = 'auto';
            document.removeEventListener('keydown', handleKeyDown);
        }
    }, [isOpen, isClose])
};