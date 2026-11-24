import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const STORAGE_KEYS = {
    authenticated: 'authenticated',
    userId: 'userId',
};

const saveSession = (userId) => {
    sessionStorage.setItem(STORAGE_KEYS.authenticated, 'true');
    sessionStorage.setItem(STORAGE_KEYS.userId, userId);
};

const clearSession = () => {
    sessionStorage.removeItem(STORAGE_KEYS.authenticated);
    sessionStorage.removeItem(STORAGE_KEYS.userId);
};

const loadSession = () => ({
    isAuthenticated: sessionStorage.getItem(STORAGE_KEYS.authenticated) === 'true',
    userId: sessionStorage.getItem(STORAGE_KEYS.userId),
});

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState(null);

    const updateAuthState = (authenticated, id) => {
        setIsAuthenticated(authenticated);
        setUserId(id);
    };

    useEffect(() => {
        const session = loadSession();
        updateAuthState(session.isAuthenticated, session.userId);
    }, []);

    const login = (id) => {
        saveSession(id);
        updateAuthState(true, id);
    };

    const logout = () => {
        clearSession();
        updateAuthState(false, null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userId, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
