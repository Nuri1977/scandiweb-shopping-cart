import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCurrentCurrency } from "../../redux/currency.reducer";
import {
  selectCartItems,
  selectCartItemsTotal,
  selectCartItemsTotalPrice,
} from "../../redux/cart.reducer";

import CartMenuItem from "./CartMenuItem";

class CartMenuContainer extends React.Component {
  render() {
    const {
      cartItems,
      cartItemsTotalCount,
      cartItemsTotalPrice,
      currentCurrency,
      children,
      className,
    } = this.props;

    const totalPrice = cartItemsTotalPrice(currentCurrency);
    return (
      <div className={className}>
        {cartItemsTotalCount ? (
          <div className="cart-items-container__items">
            {cartItems.map((item, idx) => (
              <CartMenuItem
                item={item}
                key={idx}
                id={idx}
                currentCurrency={currentCurrency}
              />
            ))}
          </div>
        ) : (
          { ...children }
        )}

        <div className="cart-items__total">
          <span>Total</span>
          <span>{totalPrice}</span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentCurrency: selectCurrentCurrency,
  cartItems: selectCartItems,
  cartItemsTotalCount: selectCartItemsTotal,
  cartItemsTotalPrice: (currency) => selectCartItemsTotalPrice(currency),
});

export default connect(mapStateToProps)(CartMenuContainer);