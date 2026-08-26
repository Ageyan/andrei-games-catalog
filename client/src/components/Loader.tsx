interface LoaderProps {
    fullSize?: boolean;
    gamePage?: boolean;
    btn?: boolean;
}

export const Loader = ({ fullSize, gamePage, btn }: LoaderProps) => {
    const fullScreen = fullSize || gamePage;
    return (
        <div
            className={`game-loader ${fullScreen ? 'full' : ''} ${btn ? 'btn-show' : ''}`}
        >
            <svg
                className={`game-loader__gamepad ${fullScreen ? 'full' : ''} ${btn ? 'btn-show' : ''}`}
                viewBox="0 0 100 60"
            >
                <path
                    className="game-loader__body"
                    d="M20,10 C10,10 5,20 5,35 C5,50 15,55 25,55 C32,55 38,48 50,48 C62,48 68,55 75,55 C85,55 95,50 95,35 C95,20 90,10 80,10 Z"
                    fill="none"
                    stroke="#626262"
                    strokeWidth="4"
                />
                <path
                    className="game-loader__dpad"
                    d="M22,24 h4 v4 h4 v4 h-4 v4 h-4 v-4 h-4 v-4 h4 Z"
                    fill="#656565"
                />
                <circle
                    className="game-loader__btn btn-1"
                    cx="72"
                    cy="32"
                    r="3"
                    fill="#ff4757"
                />
                <circle
                    className="game-loader__btn btn-2"
                    cx="78"
                    cy="26"
                    r="3"
                    fill="#2ed573"
                />
                <circle
                    className="game-loader__btn btn-3"
                    cx="84"
                    cy="32"
                    r="3"
                    fill="#1e90ff"
                />
                <circle
                    className="game-loader__btn btn-4"
                    cx="78"
                    cy="38"
                    r="3"
                    fill="#ffa502"
                />
            </svg>
            <p
                className={`game-loader__loading-text ${fullScreen ? 'full' : ''} ${btn ? 'btn-show' : ''}`}
            >
                {fullScreen ? 'GAMES CATALOG' : 'Loading Games'}
            </p>
        </div>
    );
};

export default Loader;
