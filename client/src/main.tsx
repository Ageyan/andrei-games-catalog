import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/main.scss';
import App from './App.tsx';
import { FavoriteProvider } from './context/FavoritesContext.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <FavoriteProvider>
            <App />
        </FavoriteProvider>
    </StrictMode>,
);
