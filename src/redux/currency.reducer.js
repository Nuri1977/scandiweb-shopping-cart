import { createSelector, createSlice } from "@reduxjs/toolkit";

// =====================
// === INITIAL STATE ===

const initialState = {
  isCurrencyMenuOpen: false,
  currentCurrency: {
    label: "USD",
    symbol: "$",
  },
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
  },
});

export const { toggleCurrencyMenu, dismissCurrencyMenu } =
  currencySlice.actions;

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

// ======================
// === DEFAULT EXPORT ===

export default currencySlice.reducer;