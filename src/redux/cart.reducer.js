import { createSlice, createSelector } from "@reduxjs/toolkit";

// =====================
// === INITIAL STATE ===

const initialState = {
  items: [],
};

// ================
// === ACTIONS ====

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, { payload }) => {
      state.items = [...state.items, payload];
    },
  },
});

export const { addItemToCart } = cartSlice.actions;

// =================
// === SELECTORS ===

const selectCartStore = (state) => state.cart;
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