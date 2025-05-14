// Checkout.js
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // For navigation
import Navbar from './Navbar';
import './checkout.css'; // Create a CSS file for styling

const Checkout = () => {
  // Fetch the cart from the Redux store
  const cart = useSelector((state) => state.cart || { items: [] });
  const navigate = useNavigate(); // Initialize navigate

  // Local state for billing information
  const [billingInfo, setBillingInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
  });

  const totalPrice = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingInfo({ ...billingInfo, [name]: value });
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    // Redirect to payment options
    navigate('/payment', { state: { totalPrice, productName: "Your Order" } }); // Pass totalPrice and productName (if needed)
  };
  

  return (
    <div className="checkout-container">
      <Navbar />
      <h1>Checkout</h1>
      {cart.items.length === 0 ? (
        <p>Your cart is empty. Please add items to your cart before checking out.</p>
      ) : (
        <div className="checkout-content">
          <h2>Your Order</h2>
          <ul className="checkout-items">
            {cart.items.map((item) => (
              <li key={item.id} className="checkout-item">
                <img src={item.imageURL} alt={item.title} className="checkout-item-image" />
                <div className="checkout-item-info">
                  <h3>{item.title}</h3>
                  <p>Price: ₹ {item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
              </li>
            ))}
          </ul>
          <h3>Total Price: ₹ {totalPrice}</h3>

          <form onSubmit={handleCheckout} className="checkout-form">
            <h2>Billing Information</h2>
            <input type="text" name="name" placeholder="Full Name" required onChange={handleInputChange} />
            <input type="email" name="email" placeholder="Email" required onChange={handleInputChange} />
            <input type="tel" name="phone" placeholder="Phone Number" required onChange={handleInputChange} />
            <input type="text" name="address" placeholder="Address" required onChange={handleInputChange} />
            <input type="text" name="city" placeholder="City" required onChange={handleInputChange} />
            <input type="text" name="postalCode" placeholder="Postal Code" required onChange={handleInputChange} />
            <button type="submit" className="checkout-btn">Confirm Order</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Checkout;
