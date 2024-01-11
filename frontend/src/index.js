import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './components/authContext';
import { FavoritesProvider } from './components/FavoritesContext';



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
