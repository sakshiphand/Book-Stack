import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import bookReducer from "./bookSlice";
import orderReducer from "./orderSlice";
import cartReducer from "./cartSlice";

const preloadedState = {
  auth: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
  },
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    books: bookReducer,
    order: orderReducer,
    cart: cartReducer,
  },
  preloadedState, // Load state from localStorage
});

export default store;

  // ✅ Ensure default export