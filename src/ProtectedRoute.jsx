import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getMe } from './Client.js';

export function ProtectedRoute() {
    const [isAuthenticated, setIsAuthenticated] = useState(null); // null - проверка ещё идёт
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
                localStorage.removeItem('token');
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, [token]);

    if (isAuthenticated === null) {
        return <div>Loading...</div>; // Или спиннер
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}