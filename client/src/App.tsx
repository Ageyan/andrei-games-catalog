import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import MainLayout from './layouts/MainLayout';
import Loader from './components/Loader';

const HomePage = lazy(() => import('./pages/HomePage'));
const GameDetailsPage = lazy(() => import('./pages/GameDetailsPage'));

function App() {
    return (
        <MainLayout>
            <BrowserRouter>
                <Suspense fallback={<Loader fullSize={true} />}>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/game/:id" element={<GameDetailsPage />} />
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </MainLayout>
    );
}

export default App;
