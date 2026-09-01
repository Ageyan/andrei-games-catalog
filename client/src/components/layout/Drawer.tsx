import { useFavorite } from '../../context/FavoritesContext';

import FeaturedGamesList from '../game/FeaturedGamesList';

interface DrawerProps {
    isDrawerOpen: boolean;
    setIsDrawerOpen: (arg: boolean) => void;
    customClass: string;
    setIsAuthModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Drawer = ({
    isDrawerOpen,
    setIsDrawerOpen,
    customClass,
    setIsAuthModal,
}: DrawerProps) => {
    const isAuthenticated = !!localStorage.getItem('token');

    const { setIsAuthenticated, clearFavorites } = useFavorite();

    const logoutDrawer = () => {
        setIsDrawerOpen(false);

        setTimeout(() => {
            localStorage.removeItem('token');
            setIsAuthenticated(false);
            clearFavorites();
        }, 400);
    };

    return (
        <div className={`drawer ${isDrawerOpen ? 'open' : ''}`}>
            <button
                className="drawer__close-btn"
                onClick={() => setIsDrawerOpen(false)}
            >
                X
            </button>
            <FeaturedGamesList
                customClass={customClass}
                setIsAuthModal={setIsAuthModal}
                setIsDrawerOpen={setIsDrawerOpen}
            />
            {isAuthenticated && (
                <button className="drawer__logout-btn" onClick={logoutDrawer}>
                    Logout
                </button>
            )}
        </div>
    );
};

export default Drawer;
