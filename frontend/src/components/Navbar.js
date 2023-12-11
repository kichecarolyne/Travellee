import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';

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
            <NavLink className="nav-link" to="/favorites">
              FAVORITES
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/logout">
              LOGOUT
            </NavLink>
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
            <NavLink className="nav-link" to="/hotels">
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
      {/* Upper Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="navbar-brand" to="/">
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

      {/* Lower Navbar */}
      <nav className="navbar navbar-light bg-light">
        <div className="container">
          <div className="ml-auto">
            <ul className="navbar-nav mr-auto"> {/* Use "mr-auto" to push items to the far left */}
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  HOME <span className="sr-only">(current)</span>
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="ml-auto">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
