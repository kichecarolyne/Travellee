import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Logout from './Logout';

const Navbar = () => {
  const token = localStorage.getItem('token');
  const [searchQuery, setSearchQuery] = useState('');
  
  const history = useHistory();

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      history.push(`/search-results?q=${encodeURIComponent(searchQuery)}`);
    }
  };


  const RenderNavbar = () => {
    if (token) {
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
            <Logout />
          </li>
        </>
      );
    } else {
      return (
        <>
          <form className="form-inline my-2 my-lg-0 ml-auto">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '500px' }}
            />
            <button
              className="btn btn-outline-secondary my-2 my-sm-0"
              type="button"
              onClick={handleSearch}
            >
              Search
            </button>
          </form>
          
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
            <RenderNavbar />
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
