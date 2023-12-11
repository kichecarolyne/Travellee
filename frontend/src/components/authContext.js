// authContext.js

import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // State to represent the user
  const [user, setUser] = useState(null);

  // Simulate some authentication logic (you may replace this with your actual logic)
  const authenticateUser = () => {
    // Example: Check if the user is logged in from local storage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  };

  // Simulate user authentication on component mount
  useEffect(() => {
    authenticateUser();
  }, []);

  // Function to handle user login (you can replace this with your actual login logic)
  const login = (userData) => {
    // For example, setting the user and storing in local storage
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Function to handle user logout
  const logout = () => {
    // For example, removing the user from state and local storage
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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
