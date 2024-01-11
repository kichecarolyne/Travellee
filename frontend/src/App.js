import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';

import Navbar from './components/Navbar';
import SearchResults from './components/SearchResults';
import Home from './components/Home';
import DestinationList from './components/DestinationList';
import HotelList from './components/HotelList';
import Blog from './components/Blog';
import Favorites from './components/Favorites';
import Itinerary from './components/Itinerary';
import NotFound from './components/NotFound';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './components/Register';
import { AuthProvider, useAuth } from './components/authContext';
import UserProfile from './components/UserProfile';
import Logout from './components/Logout';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [results, setResults] = useState({});

  // Fetch initial search results when the component mounts
  useEffect(() => {
    fetchSearchResults();
  }, []);

  const fetchSearchResults = async () => {
    try {
      const response = await axios.get('/api/search');
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
      // Optionally set an error state or show a notification to the user
    }
  };

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    // Set user data or tokens to the context or local storage as needed
    // For example, store token in local storage
    localStorage.setItem('token', userData.token);
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    // Clear any user data or tokens from the context or local storage
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <AuthProvider>
        <div>
          <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
          
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/search" component={SearchResults} />
            <ProtectedRoute path="/destinations" component={DestinationList} />
            <ProtectedRoute path="/hotels" component={HotelList} />
            <ProtectedRoute path="/blog" component={Blog} />
            <ProtectedRoute path="/favorites" component={Favorites} />
            <Route path="/itinerary" component={Itinerary} />
            <Route path="/login">
              <Login onLogin={handleLogin} />
            </Route>
            <Route path="/profile" component={UserProfile} />
            <Route path="/register" component={Register} />
            <Route path="/logout" component={Logout} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </AuthProvider>
    </Router>
  );
}


export default App;
