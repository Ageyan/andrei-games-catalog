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
            <h1 className="hero-section__title">Games Catalog</h1>
            <input
                className="hero-section__search-input"
                type="text"
                placeholder="Enter the name of the game..."
                value={searchTerm}
                onChange={handleSearch}
            />
        </section>
    );
};

export default HomeHeroSection;
