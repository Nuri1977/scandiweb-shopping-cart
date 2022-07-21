import { combineReducers } from "@reduxjs/toolkit";

import cartReducer from "./cart.reducer";
import currencyReducer from "./currency.reducer";
import shopReducer from "./shop.reducer";

const rootReducer = combineReducers({
  cart: cartReducer,
  currency: currencyReducer,
  shop: shopReducer,
});

export default rootReducer;