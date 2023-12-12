import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Destinations from './components/Destinations';
import Hotels from './components/Hotels';
import ProductPage from './components/ProductPage';
import BlogPage from './components/BlogPage';
import Favorites from './components/Favorites';
import NotFound from './components/NotFound';
import Login from './components/Login';
import Register from './components/Register';


const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/destinations" component={Destinations} />
          <Route path="/hotels" component={Hotels} />
          <Route path="/products" component={ProductPage} />
          <Route path="/blog" component={BlogPage} />
          <Route path="/favorites" component={Favorites} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
