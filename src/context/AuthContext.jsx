import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (userId) {
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, []);

    const login = () => {
        setIsAuthenticated(true);
        // Assume userId is already set in localStorage elsewhere
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem("userId");
        localStorage.removeItem("userInitial");
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
