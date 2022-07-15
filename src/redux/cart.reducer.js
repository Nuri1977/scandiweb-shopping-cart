import { createSlice, createSelector } from "@reduxjs/toolkit";

// =====================
// === INITIAL STATE ===

const initialState = {
  isCartMenuOpen: false,
  items: [],
};

// ================
// === ACTIONS ====

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleCartMenu: (state) => {
      state.isCartMenuOpen = !state.isCartMenuOpen;
    },
    dismissCartMenu: (state) => {
      state.isCartMenuOpen = false;
    },
  },
});

export const { toggleCartMenu, dismissCartMenu } = cartSlice.actions;

// =================
// === SELECTORS ===

const selectCartStore = (state) => state.cart;
export const selectIsCartMenuOpen = createSelector(
  [selectCartStore],
  (cart) => cart.isCartMenuOpen
);

// ======================
// === DEFAULT EXPORT ===

export default cartSlice.reducer;