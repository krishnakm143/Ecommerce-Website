import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginSignup from './components/LoginSignup/LoginSignup';
import HomePage from './components/HomePage/HomePage';
import ProductDetail from './ProductsList/ProductDetail';
import MyAccount from './components/HomePage/MyAccount';

const products = [];

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
    </Router>
  );
}

export default App;
