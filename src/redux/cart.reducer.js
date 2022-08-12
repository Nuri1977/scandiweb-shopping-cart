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
    addItemToCart: (state, { payload }) => {
      state.items = [...state.items, payload];
    },
  },
});

export const { toggleCartMenu, dismissCartMenu, addItemToCart } = cartSlice.actions;

// =================
// === SELECTORS ===

const selectCartStore = (state) => state.cart;
export const selectIsCartMenuOpen = createSelector(
  [selectCartStore],
  (cart) => cart.isCartMenuOpen
);
export const selectCartItems = createSelector(
  [selectCartStore],
  (cart) => cart.items
);
export const selectCartItemsTotal = createSelector(
  [selectCartItems],
  (items) => items.length
);

// ======================
// === DEFAULT EXPORT ===

export default cartSlice.reducer;