import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import type { User, UserLoginRequest, UserRegisterRequest } from '../types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (credentials: UserLoginRequest) => Promise<void>;
  register: (credentials: UserRegisterRequest) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
   const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setIsLoading(false);
      return;
    }

    authAPI.getMe()
      .then((user) => {
        setUser(user);
      })
      .catch(() => {
        localStorage.removeItem('access_token');
        setUser(null);
        navigate('/login');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);


  const login = async (credentials: UserLoginRequest) => {
    try {
      const response = await authAPI.login(credentials);
      localStorage.setItem('access_token', response.access_token);
      const currentUser = await authAPI.getMe();
      setUser(currentUser);
    } catch (error) {
      throw error;
    }
  };

  const register = async (credentials: UserRegisterRequest) => {
    try {
      await authAPI.register(credentials);
      // Auto-login after registration
      await login({ email: credentials.email, password: credentials.password });
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    setUser(null);
    navigate('/');
  };

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};