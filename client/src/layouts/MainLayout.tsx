import type { ReactNode } from 'react';

import { useScrollToTop } from '../hooks/useScrollToTop';

import Footer from '../components/layout/Footer';

interface Props {
    children: ReactNode;
}

const MainLayout = ({ children }: Props) => {
    useScrollToTop();

    return (
        <div className="layout-wrapper">
            <main className="main-content">{children}</main>
            <Footer />
        </div>
    );
};

export default MainLayout;
