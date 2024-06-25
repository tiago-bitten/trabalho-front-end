import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const authenticated = sessionStorage.getItem('authenticated') === 'true';
        const storedUserId = sessionStorage.getItem('userId');
        
        setIsAuthenticated(authenticated);
        setUserId(storedUserId);
    }, []);

    const login = (id) => {
        sessionStorage.setItem('authenticated', 'true');
        sessionStorage.setItem('userId', id);
        setIsAuthenticated(true);
        setUserId(id);
    };

    const logout = () => {
        sessionStorage.removeItem('authenticated');
        sessionStorage.removeItem('userId');
        setIsAuthenticated(false);
        setUserId(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userId, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
