import { createSelector, createSlice } from "@reduxjs/toolkit";
import { fetchCurrencyOptions } from "../api";

// =====================
// === INITIAL STATE ===

const initialState = {
  isCurrencyMenuOpen: false,
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
    toggleCurrencyMenu: (state) => {
      state.isCurrencyMenuOpen = !state.isCurrencyMenuOpen;
    },
    dismissCurrencyMenu: (state) => {
      state.isCurrencyMenuOpen = false;
    },
    setCurrentCurrency: (state, { payload }) => {
      state.currentCurrency = payload;
    },
    setCurrencyOptions: (state, { payload }) => {
      state.currencyOptions = payload;
    },
  },
});

export const {
  toggleCurrencyMenu,
  dismissCurrencyMenu,
  setCurrencyOptions,
  setCurrentCurrency,
} = currencySlice.actions;

// =================
// === SELECTORS ===

const selectCurrencyStore = (state) => state.currency;
export const selectIsCurrencyMenuOpen = createSelector(
  [selectCurrencyStore],
  (currency) => currency.isCurrencyMenuOpen
);
export const selectCurrentCurrency = createSelector(
  [selectCurrencyStore],
  (currency) => currency.currentCurrency
);
export const selectCurrencyOptions = createSelector(
  [selectCurrencyStore],
  (currency) => currency.currencyOptions
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