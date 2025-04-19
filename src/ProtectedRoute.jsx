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
                const response = await fetch(`/api/users/me`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                });

                const responseData = await response.json();

                if (!response.ok) {
                    localStorage.removeItem('token');
                    setIsAuthenticated(false);
                } else {
                    setIsAuthenticated(true);
                    return responseData;
                }

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