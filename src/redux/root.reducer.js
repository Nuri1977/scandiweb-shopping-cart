import { combineReducers } from "@reduxjs/toolkit";

import cartReducer from "./cart.reducer";
import currencyReducer from "./currency.reducer";

const rootReducer = combineReducers({
  cart: cartReducer,
  currency: currencyReducer,
});

export default rootReducer;