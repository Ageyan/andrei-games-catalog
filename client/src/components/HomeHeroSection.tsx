import { useFavorite } from '../context/FavoritesContext';

import { IoLogoGameControllerA } from 'react-icons/io';

interface HomeHeroSectionProps {
    searchTerm: string;
    handleSearch: (event: React.ChangeEvent<HTMLInputElement, Element>) => void;
    setIsAuthModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const HomeHeroSection = ({
    searchTerm,
    handleSearch,
    setIsAuthModal,
}: HomeHeroSectionProps) => {
    const { isAuthenticated, setIsAuthenticated, clearFavorites } =
        useFavorite();

    return (
        <section className="hero-section">
            <div className="hero-section__container">
                <div className="hero-section__user-container">
                    <IoLogoGameControllerA
                        className={`hero-section__user-icon ${isAuthenticated ? 'is-auth' : ''}`}
                    />
                    {isAuthenticated ? (
                        <button
                            className="hero-section__btn logout"
                            onClick={() => {
                                localStorage.removeItem('token');
                                setIsAuthenticated(false);
                                clearFavorites();
                            }}
                        >
                            Logout
                        </button>
                    ) : (
                        <button
                            className="hero-section__btn sign-in"
                            onClick={() => setIsAuthModal(true)}
                        >
                            Sign in
                        </button>
                    )}
                </div>
                <h1 className="hero-section__title">Games Catalog</h1>
                <input
                    className="hero-section__search-input"
                    name="search"
                    type="search"
                    autoCapitalize="none"
                    autoComplete="new-password"
                    placeholder="Enter the name of the game..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>
        </section>
    );
};

export default HomeHeroSection;
