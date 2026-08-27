import FeaturedGamesList from './FeaturedGamesList';
import { IoClose } from 'react-icons/io5';

interface DrawerProps {
    isDrawerOpen: boolean;
    setIsDrawerOpen: (arg: boolean) => void;
    customClass: string;
}

const Drawer = ({
    isDrawerOpen,
    setIsDrawerOpen,
    customClass,
}: DrawerProps) => {
    return (
        <div className={`drawer ${isDrawerOpen ? 'open' : ''}`}>
            <button
                className="drawer__close-btn"
                onClick={() => setIsDrawerOpen(false)}
            >
                <IoClose className="drawer__close-btn-icon" />
            </button>
            <FeaturedGamesList customClass={customClass} />
        </div>
    );
};

export default Drawer;
