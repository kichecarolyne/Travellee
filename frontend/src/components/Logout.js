import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from './authContext';

const Logout = ({ onLogout }) => {
  const { user, logout } = useAuth();
  const history = useHistory();

  const handleLogout = async () => {
    try {
      await fetch('/api/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${user.token}`,
        },
      });

      logout();
      console.log('Logout successful');
      onLogout(); // Call the onLogout function passed as a prop
      history.push('/'); // Redirect to home page after logout
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <button type="button" className="btn btn-danger" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;
