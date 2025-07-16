import { createContext, useContext, useState, useEffect } from 'react';
import api from '../lib/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log(token)
        if (token) {
            api.get('/api/auth/profile')
                .then(response => {
                    setUser(response.data);
                })
                .catch(() => {
                    localStorage.removeItem('token');
                    setUser(null);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (credentials) => {
        const response = await api.post('/api/auth/login', credentials);
        const { user, token } = response.data;
        localStorage.setItem('token', token);
        console.log("reached")
        setUser(user);
        return { user, token };
    };

    const register = async (userData) => {
        const response = await api.post('/api/auth/register', userData);
        const { user, token } = response.data;
        localStorage.setItem('token', token);
        setUser(user);
        return { user, token };
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
