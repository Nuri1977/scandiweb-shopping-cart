import { createSelector, createSlice } from "@reduxjs/toolkit";
import { fetchCurrencyOptions } from "../api";
import { formatPrice } from "./utils";

// =====================
// === INITIAL STATE ===

const initialState = {
  currentCurrency: {
    label: "USD",
    symbol: "$",
  },
  currencyOptions: null,
};

// ================
// === ACTIONS ====

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setCurrentCurrency: (state, { payload }) => {
      state.currentCurrency = payload;
    },
    setCurrencyOptions: (state, { payload }) => {
      state.currencyOptions = payload;
    },
  },
});

export const {
  setCurrencyOptions,
  setCurrentCurrency,
} = currencySlice.actions;

// =================
// === SELECTORS ===

const selectCurrencyStore = (state) => state.currency;
export const selectCurrentCurrency = createSelector(
  [selectCurrencyStore],
  (currency) => currency.currentCurrency
);
export const selectCurrentCurrencySymbol = createSelector(
  [selectCurrentCurrency],
  (currency) => currency.symbol
);
export const selectCurrencyOptions = createSelector(
  [selectCurrencyStore],
  (currency) => currency.currencyOptions
);
export const selectProductPrice = createSelector(
  [selectCurrentCurrency],
  (currency) => (productPrices) => {
    const amount = productPrices.find(
      (p) => p.currency.symbol === currency.symbol
    ).amount;
    return `${currency.symbol}${formatPrice(amount, currency)}`;
  }
);

// =============
// === THUNK ===

export const getCurrencyOptionsAsync = () => {
  return (dispatch) => {
    fetchCurrencyOptions().then((res) => {
      dispatch(setCurrencyOptions(res));
    });
  };
};

// ======================
// === DEFAULT EXPORT ===

export default currencySlice.reducer;