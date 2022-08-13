import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RestaurantPage from './components/RestaurantPage';
import SearchPage from './components/SearchPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path='/' element={<App simpleHeader={false} />}>
          <Route index element={<HomePage />} />
          <Route path='home' element={<HomePage />} />
          <Route path='restaurant' element={<RestaurantPage />}>
            <Route path=':restaurantName' element={<RestaurantPage />} />
          </Route>
          <Route path='search' element={<SearchPage />}>
            <Route path=':q' element={<SearchPage />} />
          </Route>
        </Route>
        <Route path='/login' element={<App simpleHeader={true} />}>
          <Route index element={<LoginPage signingUp={false} />} />
        </Route>
        <Route path='/signup' element={<App simpleHeader={true} />}>
          <Route index element={<LoginPage signingUp={true} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);