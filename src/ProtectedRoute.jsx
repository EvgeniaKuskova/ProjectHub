import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import {getMe} from './Client.js'

export function ProtectedRoute() {
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
}