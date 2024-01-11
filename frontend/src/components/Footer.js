import React from 'react';
import { Link } from 'react-router-dom';


const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4">
      <div className="container">
        <p className="mb-0">Copyright © 2023</p>
        <div className="social mt-2">
          <i className="fa fa-facebook mx-2"></i>
          <i className="fa fa-instagram mx-2"></i>
        </div>
        <div className="mt-3">
          <Link to="/destinations" className="text-light mx-2">
            Destinations
          </Link>
          <Link to="/hotels" className="text-light mx-2">
            Hotels
          </Link>
          <Link to="/favorites" className="text-light mx-2">
            Favorites
          </Link>
          <Link to="/blog" className="text-light mx-2">
            Blog
          </Link>
          <Link to="/login" className="text-light mx-2">
            Login
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
