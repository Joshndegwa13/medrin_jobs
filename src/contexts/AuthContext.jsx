import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const login = async (credentials) => {
    // This will be replaced with actual API call
    try {
      // Mock login
      const mockUser = {
        id: 1,
        role: credentials.userType,
        ...(credentials.userType === 'employer' 
          ? { 
              company_name: 'Test Company',
              location: 'Nairobi',
              description: 'Test company description',
              mission: 'Our mission',
              vision: 'Our vision'
            }
          : {
              firstname: 'John',
              lastname: 'Doe',
              email: credentials.email,
              location: 'Nairobi',
              phone: '+254712345678',
              dateOfBirth: '1990-01-01'
            }
        )
      };
      
      setUser(mockUser);
      toast.success('Login successful!');
      navigate(mockUser.role === 'employer' ? '/employer' : '/find-jobs');
    } catch (error) {
      toast.error('Login failed');
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    navigate('/');
    toast.success('Logged out successfully');
  };

  const updateProfile = async (data) => {
    // This will be replaced with actual API call
    try {
      setUser(prev => ({ ...prev, ...data }));
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
      throw error;
    }
  };

  const value = {
    user,
    login,
    logout,
    updateProfile,
    isAuthenticated: !!user
  };

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