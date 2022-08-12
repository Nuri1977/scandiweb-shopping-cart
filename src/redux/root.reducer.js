import { combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./cart.reducer";
import currencyReducer from "./currency.reducer";
import shopReducer from "./shop.reducer";
import uiReducer from "./ui.reducer";

const rootReducer = combineReducers({
  cart: cartReducer,
  currency: currencyReducer,
  shop: shopReducer,
  ui: uiReducer,
});

export default rootReducer;