import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import BookPage from './components/BookPage';
import HomePage from './components/HomePage';
import { ForgotpasswordPage, LoginPage, SignupPage } from './components/LoginPage';
import ProfilePage from './components/ProfilePage';
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
          <Route path='search' element={<SearchPage />} />
          <Route path='book' element={<BookPage />} />
          <Route path='profile' element={<ProfilePage />} />
        </Route>
        <Route path='/' element={<App simpleHeader={true} />}>
          <Route index element={<LoginPage />} />
          <Route path='login' element={<LoginPage />} />
          <Route path='signup' element={<SignupPage />} />
          <Route path='forgotpassword' element={<ForgotpasswordPage />} />
        </Route>
        {/* <Route path='/login' element={<App simpleHeader={true} />}>
          <Route index element={<LoginPage />} />
        </Route> */}
        {/* <Route path='/signup' element={<App simpleHeader={true} />}>
          <Route index element={<SignupPage />} />
        </Route> */}
        {/* <Route path='/forgotpassword' element={<App simpleHeader={true} />}>
          <Route index element={<ForgotpasswordPage />} />
        </Route> */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);