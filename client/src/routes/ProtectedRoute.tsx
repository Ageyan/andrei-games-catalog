import { type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const isAuthentificated = !!localStorage.getItem('token');

    if (!isAuthentificated) {
        return <Navigate to="/auth/" replace />;
    }

    return children;
};

export default ProtectedRoute;
