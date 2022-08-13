import React from "react";
import { map } from "lodash";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { addItemToCart, removeItemFromCart } from "../../redux/cart.reducer";
import { selectProductPrice } from "../../redux/currency.reducer";
import { ReactComponent as AddSVG } from "../../assets/add-sign.svg";
import { ReactComponent as SubSVG } from "../../assets/sub-sign.svg";
import TestImage from "../../assets/test.png";
import "./CartMenuItem.scss";

class CartMenuItem extends React.Component {
  render() {
    const { currentCurrency, item, increase, decrease, getProductPrice } =
      this.props;
    const { brand, name, gallery, quantity, selectedAttributes, prices } = item;

    const price = getProductPrice(prices);

    const displayedAttributes = map(selectedAttributes, (value, key) => {
      return (
        <span
          key={key}
          className={`cart-menu-item__attribute
          ${
            value.toLowerCase() === "no" ? "cart-menu-item__attribute__no" : ""
          }`}
        >
          {["yes", "no"].includes(value.toLowerCase()) ? key : value}
        </span>
      );
    });

    return (
      <div className="cart-menu-item">
        <div className="cart-menu-item__info">
          <div>
            <h2 className="cart-menu-item__info__brand">{brand}</h2>
            <h1 className="cart-menu-item__info__name">{name}</h1>
            <span className="cart-menu-item__info__price">{price}</span>
          </div>
          <div className="cart-menu-item__attributes">
            {displayedAttributes}
          </div>
        </div>
        <div className="cart-menu-item__quantity">
          <div
            className="cart-menu-item__quantity__button"
            onClick={() => increase(item)}
          >
            <AddSVG />
          </div>
          <span className="cart-menu-item__quantity__value">{quantity}</span>
          <div
            className="cart-menu-item__quantity__button"
            onClick={() => decrease(item)}
          >
            <SubSVG />
          </div>
        </div>
        <div
          className="cart-menu-item__thumbnail"
          style={{ backgroundImage: `url('${TestImage}')` }}
        ></div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  getProductPrice: (prices) => selectProductPrice(prices),
});

const mapDispatchToProps = (dispatch) => ({
  increase: (item) => dispatch(addItemToCart({ item })),
  decrease: (item) => dispatch(removeItemFromCart({ item })),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartMenuItem);