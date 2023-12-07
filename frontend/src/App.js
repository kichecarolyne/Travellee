import { Switch, Route } from 'react-router-dom/cjs/react-router-dom.min';
import './App.css';
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Navbar from './components/Navbar';

function App() {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path='/'><Home /></Route>
        <Route path='/login'><Login /></Route>
        <Route path='/register'><Register /></Route>
      </Switch>
    </div>
  );
}

export default App;
