import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

import { fetchCategoryNames, fetchCategoryProducts } from "../api";

// =====================
// === INITIAL STATE ===

const initialState = {
  isLoading: true,
  hasNetworkError: false,
  categoryNames: null,
  products: {},
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
    setCategoryProducts: (state, { payload: { categoryName, products } }) => {
      state.products[categoryName] = products;
    },
    setIsLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setHasNetworkError: (state, { payload }) => {
      state.hasNetworkError = payload;
    },
  },
});

export const {
  setCategoryNames,
  setCategoryProducts,
  setIsLoading,
  setHasNetworkError,
} = shopSlice.actions;

// =================
// === SELECTORS ===

const selectShopStore = (state) => state.shop;
export const selectCategoryNames = createSelector(
  [selectShopStore],
  (shop) => shop.categoryNames
);
export const selectIsLoading = createSelector(
  [selectShopStore],
  (shop) => shop.isLoading
);
export const selectHasNetworkError = createSelector(
  [selectShopStore],
  (shop) => shop.hasNetworkError
);
export const selectProducts = createSelector(
  [selectShopStore],
  (shop) => shop.products
);
export const selectCategoryProducts = createSelector(
  [selectShopStore],
  (shop) => (categoryName) => {
    const products = shop.products;
    return products[categoryName] ? products[categoryName] : null;
  }
);


// =============
// === THUNK ===

export const getCategoryNamesAsync = () => {
  return (dispatch) => {
    dispatch(setIsLoading(true));
    fetchCategoryNames()
      .then((res) => {
        dispatch(setCategoryNames(res));
      })
      .catch((_err) => dispatch(setHasNetworkError(true)))
      .finally(() => dispatch(setIsLoading(false)));
  };
};

export const getCategoryProductsAsync = (categoryName) => {
  return (dispatch) => {
    dispatch(setIsLoading(true));
    fetchCategoryProducts(categoryName)
      .then((products) => {
        dispatch(setCategoryProducts({ categoryName, products }));
      })
      .catch((_err) => dispatch(setHasNetworkError(true)))
      .finally(() => dispatch(setIsLoading(false)));
  };
};

// ======================
// === DEFAULT EXPORT ===

export default shopSlice.reducer;