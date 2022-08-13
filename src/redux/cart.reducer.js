import { createSlice, createSelector } from "@reduxjs/toolkit";
import { transform } from "lodash";
import { formatPrice, findCartItemIdx } from "./utils";

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
    addItemToCart: (state, { payload: { item } }) => {
      state.items.push(item);
    },
    removeItemFromCart: (state, { payload: { item } }) => {
      const idx = findCartItemIdx(state.items, item, false);
      state.items.splice(idx, 1);
    },
  },
});

export const { addItemToCart, removeItemFromCart } = cartSlice.actions;

// =================
// === SELECTORS ===

const selectCartStore = (state) => state.cart;
export const selectCartItems = createSelector(
  [selectCartStore],
  (cart) => {
    const itemsForDisplay = transform(
      cart.items,
      (accumulator, item) => {
        const idx = findCartItemIdx(accumulator, item);
        idx > -1
          ? (accumulator[idx].quantity += 1)
          : accumulator.push({ ...item, quantity: 1 });
      },
      []
    );
    return itemsForDisplay;
  }
);
export const selectCartItemsTotal = createSelector(
  [selectCartItems],
  (items) => items.length
);

export const selectCartItemsTotalPrice = createSelector(
  [selectCartItems],
  (items) => (currency) => {
    const total = items.reduce(
      (accumulator, item) =>
        accumulator +
        item.prices.find((p) => p.currency.label === currency.label).amount *
          item.quantity,
      0
    );
    return formatPrice(total, currency);
  }
);

// ======================
// === DEFAULT EXPORT ===

export default cartSlice.reducer;