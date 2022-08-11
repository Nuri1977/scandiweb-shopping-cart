import React from "react";
import { connect } from "react-redux";
import { compose } from "@reduxjs/toolkit";
import { createStructuredSelector } from "reselect";

// internal
import { withNavigationAndParams } from "../../helpers/HocNavigation";
import {
  getCategoryProductsAsync,
  selectCategoryProducts,
} from "../../redux/shop.reducer";

import "./Category.scss";

// components
import CategoryItem from "../../components/categoryItem/CategoryItem";

class Category extends React.Component {
  render() {
    const { categoryName, getProducts, fetchCategoryProducts } = this.props;
    const products = getProducts(categoryName);
    if (!products) fetchCategoryProducts(categoryName);

    return (
      <div id="category-page">
        <h1>{categoryName}</h1>
        {products ? (
          <div className="products-container">
            {products.map((product) => (
              <CategoryItem key={product.id} product={product} />
            ))}
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  getProducts: selectCategoryProducts,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCategoryProducts: (categoryName) =>
    dispatch(getCategoryProductsAsync(categoryName)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withNavigationAndParams
)(Category);