import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import MainLayout from './components/MainLayout';

const HomePage = lazy(() => import('./pages/HomePage'));
const GameDetailsPage = lazy(() => import('./pages/GameDetailsPage'));

function App() {
    return (
        <MainLayout>
            <BrowserRouter>
                <Suspense fallback={<div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>Page loading...</div>}>
                    <Routes>
                        <Route path='/' element={<HomePage/>}/>
                        <Route path='/game/:id' element={<GameDetailsPage/>}/>
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </MainLayout>
    );
}

export default App;
