import { createSlice, createSelector } from "@reduxjs/toolkit";

// =====================
// === INITIAL STATE ===

const initialState = {
  isCartMenuOpen: false,
  isCurrencyMenuOpen: false,
};

// ================
// === ACTIONS ====

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleCartMenu: (state) => {
      if (state.isCurrencyMenuOpen) state.isCurrencyMenuOpen = false;
      state.isCartMenuOpen = !state.isCartMenuOpen;
    },
    toggleCurrencyMenu: (state) => {
      if (state.isCartMenuOpen) state.isCartMenuOpen = false;
      state.isCurrencyMenuOpen = !state.isCurrencyMenuOpen;
    },
    dismissCurrencyMenu: (state) => {
      state.isCurrencyMenuOpen = false;
    },
    dismissCartMenu: (state) => {
      state.isCartMenuOpen = false;
    },
  },
});

export const {
  dismissCartMenu,
  dismissCurrencyMenu,
  toggleCartMenu,
  toggleCurrencyMenu,
} = uiSlice.actions;

// =================
// === SELECTORS ===

const selectUIStore = (state) => state.ui;
export const selectIsCurrencyMenuOpen = createSelector(
  [selectUIStore],
  (ui) => ui.isCurrencyMenuOpen
);
export const selectIsCartMenuOpen = createSelector(
  [selectUIStore],
  (ui) => ui.isCartMenuOpen
);

// ======================
// === DEFAULT EXPORT ===

export default uiSlice.reducer;