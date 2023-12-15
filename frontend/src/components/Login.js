import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from './authContext';

const Login = () => {
  const { user, login, logout } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const userData = await response.json();
        login(userData);
        setLoginSuccess('Login successful');
        setLoginError('');
      } else {
        // Handle unsuccessful login
        const errorData = await response.json();
        setLoginError(`Login failed: ${errorData.message}`);
        setLoginSuccess('');
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Login error:', error);
      setLoginError('Login error. Please try again.');
      setLoginSuccess('');
    }
  };

  const handleLogout = async () => {
    try {
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
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <>
      <section>
        <div className="container mt-5">
          <div className='row'>
            <div className="col-sm-6 offset-md-3 offset-sm-1 ">
              <form method="POST">
                {/* Login form */}
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
                    required
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
                    required
                  />
                </div>

                {loginError && <p className="text-danger">{loginError}</p>}
                {loginSuccess && <p className="text-success">{loginSuccess}</p>}

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