import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Logout from './Logout';
import axios from 'axios';


const Navbar = ({ isLoggedIn, onLogout }) => {
  const history = useHistory();
  const token = localStorage.getItem('token');

  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/search?q=${searchQuery}`);
      setResults(response.data);
      // Clear the search query after successfully fetching results
      setSearchQuery('');
    } catch (error) {
      console.error("Error searching:", error);
    }
  };
  
  // Reset the search results when navigating away or on some other action
  const handleNavigationOrAction = () => {
    setResults([]); // Clear the results
    setSearchQuery(''); // Clear the search query
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    onLogout();
    history.push('/login');
  };

  const RenderNavbar = () => {
    if (isLoggedIn) {
      return (
        <>
          <li className="nav-item">
            <NavLink className="nav-link" to="/destinations">
              DESTINATIONS
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/hotels">
              HOTELS
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/blog">
              BLOG
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/favorites">
              FAVORITES
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/profile">
              <FontAwesomeIcon icon={faUser} />
            </NavLink>
          </li>
          <li className="nav-item">
            <Logout onLogout={onLogout} />
          </li>
        </>
      );
    } else {
      return (
        <>          
          <li className="nav-item">
            <NavLink className="nav-link" to="/destinations">
              DESTINATIONS
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/hotels">
              HOTELS
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/favorites">
              FAVORITES
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/blog">
              BLOG
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/login">
              LOGIN
            </NavLink>
          </li>
        </>
      );
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="navbar-brand" to="/" style={{ color: '#4169e1' }}>
          <b>TRAVELLEE</b>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
          {/* Search Bar */}
          <li className="nav-item">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: '500px' }}
              />
            </li>
            
            {/* Search Button */}
            <li className="nav-item">
              <button className="btn btn-outline-secondary" onClick={handleSearch}>
                Search
              </button>
            </li>
            
            {/* Display Results */}
            {results.map((result, index) => (
              <li key={index}>
                <h3>{result.title}</h3>
                <p>{result.content}</p>
              </li>
            ))}
            
            <RenderNavbar />
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;