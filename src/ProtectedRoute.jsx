import { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

export function ProtectedRoute() {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            setIsAuthenticated(false);
            return;
        }

        const checkAuth = async () => {
            try {
                await getMe();
                setIsAuthenticated(true);
            } catch (error) {
                console.error('Authentication failed:', error);
                localStorage.removeItem('token');
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, [token]);

    // Если проверка ещё идёт, показываем загрузку
    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    // Если не аутентифицирован, перенаправляем на логин
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Если аутентифицирован, показываем дочерние маршруты
    return <Outlet />;
}