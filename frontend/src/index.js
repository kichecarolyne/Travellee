import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './components/authContext';
import { FavoritesProvider } from './components/FavoritesContext';
import './App.css';
import './index.css';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
    <FavoritesProvider>
    <App />
    </FavoritesProvider>
    </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
