import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useAuth } from './authContext';

const Login = ({ onLogin }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

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
        setLoginError('');
        onLogin(userData);

        // Check if there's a state object in the history location
        const { state } = history.location;
        if (state && state.from) {
          // Redirect to the previous location
          history.push(state.from);
        } else {
          // If there's no previous location, redirect to the default location ('/blog' in this case)
          history.push('');
        }
      } else if (response.status === 401) {
        const errorData = await response.json();
        setLoginError(`Login failed: ${errorData.message}`);
      } else {
        console.error('Login failed:', response.statusText);
        setLoginError('Login error. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('Login error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-6 offset-md-3 offset-sm-1 ">
            <form onSubmit={handleLogin}>
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

              {loading && <p>Loading...</p>}
              {loginError && <p className="text-danger">{loginError}</p>}

              <NavLink to='/register'>Didn't Register, then register here!</NavLink><br /><br />
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
