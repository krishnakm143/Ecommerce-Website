import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../HomePage/cartslice'; // Adjust path if necessary
import Navbar from './Navbar';
import './cart.css'; // Import the CSS file
import { Link } from 'react-router-dom';

const Cart = () => {
  // Fetch the cart from the Redux store
  const cart = useSelector((state) => state.cart || { items: [] });
  const dispatch = useDispatch();

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart({ id }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const totalPrice = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="cart-container">
      <Navbar />
      <h1>Your Cart</h1>
      {cart.items.length === 0 ? (
        <p>Cart is currently empty.</p>
      ) : (
        <div className="cart-content">
          <ul className="cart-items">
            {cart.items.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={item.imageURL} alt={item.title} className="cart-item-image" />
                <div className="cart-item-info">
                  <h3>{item.title}</h3>
                  <p>Price: ₹ {item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <button className="remove-btn" onClick={() => handleRemoveItem(item.id)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <h2>Cart Summary</h2>
            <p>Total Price: ₹ {totalPrice}</p>
            <button className="clear-cart-btn" onClick={handleClearCart}>Clear Cart</button>
          </div>
          <div className="payment-options">
  <h2>Payment Options</h2>
  <Link to="/checkout">
    <button className="checkout-btn">Proceed to Checkout</button>
  </Link>
</div>

        </div>
      )}
    </div>
  );
};

export default Cart;
