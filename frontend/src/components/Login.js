import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from './authContext';

const Login = () => {
  const { user, login, logout } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Assuming you have a server endpoint for login
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const userData = await response.json();
        // Perform your logic with the user data received from the server
        login(userData);
      } else {
        // Handle unsuccessful login (e.g., show an error message)
        console.error('Login failed');
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error during login:', error);
    }
  };

  const handleLogout = async () => {
    try {
      // Assuming you have a server endpoint for logout
      const response = await fetch('/api/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${user.token}`, // Include the user's token for authentication
        },
      });

      if (response.ok) {
        // Perform your logic for a successful logout
        logout();
        // Optionally, you may want to redirect the user or perform other actions
        console.log('Logout successful');
      } else {
        // Handle unsuccessful logout (e.g., show an error message)
        console.error('Logout failed');
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error during logout:', error);
    }
  };

  return (
    <>
      <section>
        <div className="container mt-5">
          <div className='row'>
            <div className="col-sm-6 offset-md-3 offset-sm-1 ">
              <form method="POST">
                {/* Your login form here */}
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your Email"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your Password"
                  />
                </div>

                <NavLink to='/register'>Didn't Register, then register here!</NavLink><br /><br />
                <button type="submit" className="btn btn-primary" id='login' name='login' onClick={handleLogin}>Login</button>

                {/* Logout button */}
                {user && (
                  <button type="button" className="btn btn-danger" onClick={handleLogout}>
                    Logout
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
