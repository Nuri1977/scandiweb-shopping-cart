import { createSlice, createSelector } from "@reduxjs/toolkit";

import { fetchCategoryNames } from "../api";

// =====================
// === INITIAL STATE ===

const initialState = {
  categoryNames: null,
};

// ================
// === ACTIONS ====

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setCategoryNames: (state, { payload }) => {
      state.categoryNames = payload;
    },
  },
});

export const { setCategoryNames } = shopSlice.actions;

// =================
// === SELECTORS ===

const selectShopStore = (state) => state.shop;
export const selectCategoryNames = createSelector(
  [selectShopStore],
  (shop) => shop.categoryNames
);

// =============
// === THUNK ===

export const getCategoryNamesAsync = () => {
  return (dispatch) => {
    fetchCategoryNames().then((res) => {
      dispatch(setCategoryNames(res));
    });
  };
};

// ======================
// === DEFAULT EXPORT ===

export default shopSlice.reducer;