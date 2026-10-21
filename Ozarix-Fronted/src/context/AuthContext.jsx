import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/apiService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if authenticated user session exists in localStorage
    const savedUser = localStorage.getItem('ozarix_user');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        if (parsed && parsed.token) {
          setUser(parsed);
        } else {
          localStorage.removeItem('ozarix_user');
        }
      } catch (error) {
        console.error('Failed to parse saved user credentials:', error);
        localStorage.removeItem('ozarix_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const data = await authService.login(email, password);
      // data: { token, message, name, email, role }
      if (data && data.token) {
        const userData = {
          name: data.name || email.split('@')[0],
          email: data.email || email,
          role: data.role || 'USER',
          token: data.token,
        };
        setUser(userData);
        localStorage.setItem('ozarix_user', JSON.stringify(userData));
        setLoading(false);
        return { success: true, message: data.message || 'Login successful' };
      } else {
        setLoading(false);
        return { success: false, message: 'Invalid response from authentication server.' };
      }
    } catch (error) {
      setLoading(false);
      const errorMsg =
        error.response?.data?.message ||
        error.response?.data ||
        'Authentication failed. Please check your email and password.';
      return { success: false, message: typeof errorMsg === 'string' ? errorMsg : 'Invalid credentials.' };
    }
  };

  const register = async (name, email, password, confirmPassword) => {
    setLoading(true);
    try {
      const res = await authService.register(name, email, password, confirmPassword);
      // Auto-login after successful registration
      try {
        const loginData = await authService.login(email, password);
        if (loginData && loginData.token) {
          const userData = {
            name: loginData.name || name,
            email: loginData.email || email,
            role: loginData.role || 'USER',
            token: loginData.token,
          };
          setUser(userData);
          localStorage.setItem('ozarix_user', JSON.stringify(userData));
          setLoading(false);
          return { success: true, message: 'Account created and authenticated successfully!' };
        }
      } catch (e) {
        // If auto-login fails, user can manually log in
      }
      setLoading(false);
      return { success: true, message: typeof res === 'string' ? res : 'Registration successful! Please sign in.' };
    } catch (error) {
      setLoading(false);
      const errorMsg =
        error.response?.data?.message ||
        error.response?.data ||
        'Registration failed. Please check your information.';
      return { success: false, message: typeof errorMsg === 'string' ? errorMsg : 'Registration error.' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ozarix_user');
  };

  const isAdmin = user?.role === 'ADMIN';

  const value = {
    user,
    isAuthenticated: !!user && !!user.token,
    isAdmin,
    loading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
