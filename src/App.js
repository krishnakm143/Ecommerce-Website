import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginSignup from './components/LoginSignup/LoginSignup';
import HomePage from './components/HomePage/HomePage';
import ProductDetail from './ProductsList/ProductDetail';
import MyAccount from './components/HomePage/MyAccount';


const products = [];

import Mens from './components/HomePage/pages/mens'
import Womens from './components/HomePage/pages/womens';
import Kids from './components/HomePage/pages/kids';
import Cart from './components/Navbar/cart';
import Checkout from './components/Navbar/checkout';
import Payment from './components/Navbar/payment';


function App() {
  return (
    <Router>

      <Routes>
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/login-signup" element={<LoginSignup />} />
        <Route path="/MyAccount" element={<MyAccount />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<LoginSignup />} />
        <Route path="/product/:productId" element={<ProductDetail products={products} />} />
      </Routes>

      <div>
        <Routes>
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/login-signup" element={<LoginSignup />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/" element={<LoginSignup />} />
          <Route path="/MyAccount" element={<MyAccount />} />
          <Route path="/mens" element={<Mens />} />
          <Route path="/womens" element={<Womens />} />
          <Route path="/kids" element={<Kids />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<Payment/>} />



          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/ProductsList/ProductDetail/:productId" element={<ProductDetail />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
