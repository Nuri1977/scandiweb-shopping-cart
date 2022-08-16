import React from "react";
import { connect } from "react-redux";
import { compose } from "@reduxjs/toolkit";
import { createStructuredSelector } from "reselect";
import { withNavigation } from "../../HOC.js";
import { selectProductPrice } from "../../redux/currency.reducer";
import { ReactComponent as CartSVG } from "../../assets/circle-cart.svg";
import "./CategoryItem.scss";

class CategoryItem extends React.Component {
  render() {
    const { product, getProductPrice, navigate } = this.props;
    const { id, name, gallery, inStock, prices } = product;

    const price = getProductPrice(prices);

    return (
      <div className="category-item" onClick={() => navigate(`/product/${id}`)}>
        <div className="image-container">
          {/* <div
            className="image"
            style={{ backgroundImage: `url('${gallery[0]}')` }}
          /> */}
          {/* @@ temporary using a static test image */}
          <div
            className="image"
            style={{ backgroundImage: `url('${gallery[0]}')` }}
          />
          {inStock ? (
            <CartSVG className="cart-icon" />
          ) : (
            <div className="out-of-stock-label">
              <span>out of stock</span>
            </div>
          )}
        </div>
        <div className="footer">
          <h3 className="name">{name}</h3>
          <span className="price">{price}</span>
        </div>
        {inStock ? null : <div className="out-of-stock-overlay" />}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  getProductPrice: (prices) => selectProductPrice(prices),
});

export default compose(connect(mapStateToProps), withNavigation)(CategoryItem);