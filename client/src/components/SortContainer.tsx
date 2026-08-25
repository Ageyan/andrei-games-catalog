import { IoIosArrowDown } from 'react-icons/io';

interface SortContainerProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    sortOrder: string;
    setSortOrder: React.Dispatch<React.SetStateAction<string>>;
    setPage: React.Dispatch<React.SetStateAction<number>>;
}

const sorts = [
    { id: 1, name: 'Trending games', sort: '' },
    { id: 2, name: 'Max Rating', sort: '-rating' },
    { id: 3, name: 'Min Rating', sort: 'rating' },
];

const SortContainer = ({
    isOpen,
    setIsOpen,
    sortOrder,
    setSortOrder,
    setPage,
}: SortContainerProps) => {
    return (
        <div className="sort">
            <div
                className="sort__container"
                onClick={e => {
                    setIsOpen(!isOpen);
                    e.stopPropagation();
                }}
            >
                <span>
                    {sorts.find(s => s.sort === sortOrder)?.name ||
                        sorts[0].name}
                </span>
                <IoIosArrowDown
                    className={`sort__icon ${isOpen ? 'open' : ''}`}
                />
            </div>
            {isOpen && (
                <div className="sort__options">
                    {sorts.map(s => (
                        <div
                            key={s.id}
                            className={`sort__option ${sortOrder === s.sort ? 'selected' : ''}`}
                            onClick={() => {
                                setPage(1);
                                setSortOrder(s.sort);
                                setIsOpen(false);
                            }}
                        >
                            {s.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SortContainer;
