import React from 'react';
import { useAuth } from './authContext';

const Logout = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      if (user && user.token) {
        const response = await fetch('/api/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${user.token}`,
          },
        });

        if (response.ok) {
          logout();
          console.log('Logout successful');
        } else {
          console.error('Logout failed');
        }
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <button type="button" className="btn btn-danger" onClick={handleLogout}>
      LOGOUT
    </button>
  );
};

export default Logout;
