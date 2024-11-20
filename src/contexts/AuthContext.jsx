import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { auth } from '../services/api';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Initialize auth state
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        
        if (decoded.exp < currentTime) {
          handleLogout();
        } else {
          setUser(JSON.parse(localStorage.getItem('user')));
        }
      } catch (error) {
        handleLogout();
      }
    }
    setLoading(false);
  }, []);

  const handleLogin = async (credentials) => {
    try {
      const { data } = await auth.login(credentials);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      toast.success('Login successful!');
      navigate(data.user.role === 'employer' ? '/employer' : '/find-jobs');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
      throw error;
    }
  };

  const handleGoogleLogin = async (response) => {
    try {
      const { data } = await auth.googleAuth(response.credential);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      toast.success('Login successful!');
      navigate(data.user.role === 'employer' ? '/employer' : '/find-jobs');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Google login failed');
      throw error;
    }
  };

  const handleRegister = async (userData) => {
    try {
      const { data } = await auth.register(userData);
      toast.success('Registration successful! Please verify your email.');
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
      throw error;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
    toast.success('Logged out successfully');
  };

  const value = {
    user,
    loading,
    login: handleLogin,
    googleLogin: handleGoogleLogin,
    register: handleRegister,
    logout: handleLogout,
    isAuthenticated: !!user,
  };

  if (loading) {
    return <div>Loading...</div>; // Or your loading component
  }

  return (
    <AuthContext.Provider value={value}>
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