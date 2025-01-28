import React from "react";
import { createRoot } from "react-dom/client"; // Update import statement
import App from "./App";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import productsReducer, { productsFetch } from "./slices/productsSlice";
import cartReducer, { getTotals } from "./slices/cartSlice";
import authReducer from "./slices/authSlice";
import { productsApi } from "./slices/productsApi";
import UsersSlice from "./slices/UsersSlice";
import ordersSlice from "./slices/ordersSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    users: UsersSlice,
    orders: ordersSlice,
    cart: cartReducer,
    auth: authReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

store.dispatch(productsFetch());
store.dispatch(getTotals());

const root = createRoot(document.getElementById("root")); // Update createRoot call
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
