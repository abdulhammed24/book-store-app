import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingProduct = state.find((item) => item._id === action.payload._id);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },

    removeFromCart: (state, action) => {
      return state.filter((item) => item._id !== action.payload._id);
    },

    decreaseQuantity: (state, action) => {
      const existingProduct = state.find((item) => item._id === action.payload._id);

      if (existingProduct && existingProduct.quantity > 1) {
        existingProduct.quantity -= 1;
      } else {
        return state.filter((item) => item._id !== action.payload._id);
      }

      clearCart: (state) => {
        state.length = 0;
      };
    },
  },
});

export const { addToCart, removeFromCart, decreaseQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
