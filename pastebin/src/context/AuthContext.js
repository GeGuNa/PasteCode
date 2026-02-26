import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkSession();
    }, []);

    const checkSession = async () => {
        try {
            const res = await axios.get('http://localhost:8000/api/check_session.php', {
                withCredentials: true
            });
            if (res.data.authenticated) {
                setUser(res.data.user);
            }
        } catch (error) {
            console.error('Session check failed:', error);
        } finally {
            setLoading(false);
        }
    };

       const login = async (email, password) => {
        try {
            const res = await axios.post('http://localhost:8000/api/login.php', 
                new URLSearchParams({ email, password }), 
                { withCredentials: true }
            );
            if (res.data.status === 'success') {
                setUser(res.data.user);
                return { success: true };
            }
            return { success: false, message: res.data.message };
        } catch (error) {
            return { 
                success: false, 
                message: error.response?.data?.message || 'Login failed' 
            };
        }
    };

    const register = async (username, email, password) => {
        try {
            const res = await axios.post('http://localhost:8000/api/register.php', 
                new URLSearchParams({ username, email, password }), 
                { withCredentials: true }
            );
            if (res.data.status === 'success') {
                setUser(res.data.user);
                return { success: true };
            }
            return { success: false, message: res.data.message };
        } catch (error) {
            return { 
                success: false, 
                message: error.response?.data?.message || 'Registration failed' 
            };
        }
    };

    const logout = async () => {
        try {
            await axios.get('http://localhost:8000/api/logout.php', { withCredentials: true });
        } catch (error) {
            console.error('Logout failed:', error);
        }
        setUser(null);
    };

    const forgotPassword = async (email) => {
        try {
            const res = await axios.post('http://localhost:8000/api/forgot_password.php', 
                new URLSearchParams({ email })
            );
            return { success: true, data: res.data };
        } catch (error) {
            return { 
                success: false, 
                message: error.response?.data?.message || 'Failed to send reset link' 
            };
        }
    };

    const resetPassword = async (token, password) => {
        try {
            const res = await axios.post('http://localhost:8000/api/reset_password.php', 
                new URLSearchParams({ token, password }), 
                {}
            );
            return { success: true, message: res.data.message };
        } catch (error) {
            return { 
                success: false, 
                message: error.response?.data?.message || 'Failed to reset password' 
            };
        }
    };

    const updateSettings = async (username, currentPassword, newPassword) => {
        const params = new URLSearchParams();
        if (username) params.append('username', username);
        if (currentPassword) params.append('current_password', currentPassword);
        if (newPassword) params.append('new_password', newPassword);
        
        try {
            const res = await axios.post('http://localhost:8000/api/update_settings.php', params, {
                withCredentials: true
            });
            if (res.data.status === 'success') {
                if (username) {
                    setUser({ ...user, username });
                }
                return { success: true };
            }
            return { success: false, message: res.data.message };
        } catch (error) {
            return { 
                success: false, 
                message: error.response?.data?.message || 'Failed to update settings' 
            };
        }
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            loading, 
            login, 
            register, 
            logout, 
            forgotPassword, 
            resetPassword,
            updateSettings,
            checkSession 
        }}>
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
