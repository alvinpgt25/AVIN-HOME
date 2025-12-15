import React, { createContext, useState, useContext, useEffect } from 'react';
import users from '../data/users';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('avin_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const foundUser = users.find(u => 
          u.email === email && u.password === password
        );
        
        if (foundUser) {
          const userData = { ...foundUser };
          delete userData.password;
          setUser(userData);
          localStorage.setItem('avin_user', JSON.stringify(userData));
          resolve(userData);
        } else {
          reject(new Error('Email atau password salah'));
        }
      }, 500);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('avin_user');
  };

  const updateUser = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('avin_user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    login,
    logout,
    updateUser,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;