// AuthContext.jsx

import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('diseaseAppUser');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      try {
        setCurrentUser(JSON.parse(storedUser));
        setToken(storedToken);
      } catch {
        localStorage.removeItem('diseaseAppUser');
        localStorage.removeItem('token');
      }
    }

    setIsAuthLoading(false);
  }, []);

  useEffect(() => {
    if (currentUser && currentUser.token) {
      setToken(currentUser.token);
      localStorage.setItem('token', currentUser.token);
    }
  }, [currentUser]);

  const register = async (name, email, password) => {
    setError('');
    setIsAuthLoading(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, {
        username: name,
        email,
        password
      });

      const userData = {
        username: name,
        email: email,
        token: response.data.token
      };

      localStorage.setItem('diseaseAppUser', JSON.stringify(userData));
      localStorage.setItem('token', response.data.token);
      setCurrentUser(userData);
      setToken(response.data.token);

      return userData;
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
      throw err;
    } finally {
      setIsAuthLoading(false);
    }
  };

  const login = async (email, password) => {
    setError('');
    setIsAuthLoading(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
        email,
        password
      });

      const userData = {
        username: response.data.username,
        email: response.data.username,
        token: response.data.token
      };

      localStorage.setItem('diseaseAppUser', JSON.stringify(userData));
      localStorage.setItem('token', response.data.token);
      setCurrentUser(userData);
      setToken(response.data.token);

      return userData;
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed.');
      throw err;
    } finally {
      setIsAuthLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('diseaseAppUser');
    localStorage.removeItem('token');
    setCurrentUser(null);
    setToken(null);
  };

  const value = {
    currentUser,
    token,
    isAuthLoading,
    error,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);