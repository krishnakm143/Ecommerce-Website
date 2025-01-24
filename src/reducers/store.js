import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../components/HomePage/cartslice'; // Adjust path accordingly

const store = configureStore({
  reducer: {
    cart: cartReducer,
    // other reducers if any
  },
});

export default store;
