import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: JSON.parse(localStorage.getItem("cart")) || [], // ✅ Load from localStorage
  reducers: {
    addToCart: (state, action) => {
      state.push(action.payload);
      localStorage.setItem("cart", JSON.stringify(state)); // ✅ Save to localStorage
    },
    removeFromCart: (state, action) => {
      const updatedCart = state.filter((book) => book._id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // ✅ Update localStorage
      return updatedCart;
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;