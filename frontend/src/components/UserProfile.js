import React, { useState, useEffect } from 'react';
import { useAuth } from './authContext';

const UserProfile = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (user) {
          const response = await fetch('/api/user', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${user.token}`,
            },
          });

          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }

          const userData = await response.json();
          setUserData(userData);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  return (
    <div>
      {user ? (
        <div>
          <h2>User Profile</h2>
          {loading ? (
            <p>Loading user data...</p>
          ) : userData ? (
            <div>
              <p>Welcome, {user.username}!</p>
              <p>Email: {userData.email}</p>
              <p>Bio: {userData.bio}</p>
            </div>
          ) : (
            <p>Error loading user data.</p>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default UserProfile;
