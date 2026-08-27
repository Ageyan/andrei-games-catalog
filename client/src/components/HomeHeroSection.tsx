interface HomeHeroSectionProps {
    searchTerm: string;
    handleSearch: (event: React.ChangeEvent<HTMLInputElement, Element>) => void;
}

const HomeHeroSection = ({
    searchTerm,
    handleSearch,
}: HomeHeroSectionProps) => {
    return (
        <section className="hero-section">
            <div className="hero-section__container">
                <h1 className="hero-section__title">Games Catalog</h1>
                <input
                    className="hero-section__search-input"
                    type="text"
                    placeholder="Enter the name of the game..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>
        </section>
    );
};

export default HomeHeroSection;
