import { Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import DestinationsPage from './components/DestinationsPage';
import HotelsPage from './components/HotelsPage';
import SimpleSlider from './components/SimpleSlider';  // Update the import

function App() {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path='/'><Home /></Route>
        <Route path='/login'><Login /></Route>
        <Route path='/register'><Register /></Route>
        <Route path='/destinations'>
          <DestinationsPage />
          <SimpleSlider />
        </Route>
        <Route path='/hotels'>
          <HotelsPage />
          <SimpleSlider />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
