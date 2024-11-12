// store.js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice.js";
import userReducer from "./features/user/userSlice.js";
import { booksApi } from "./features/books/booksApi.js";
import { userApi } from "./features/user/userApi.js";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    [booksApi.reducerPath]: booksApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware, userApi.middleware),
});
