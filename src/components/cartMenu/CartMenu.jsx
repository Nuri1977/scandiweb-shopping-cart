import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { dismissCartMenu } from "../../redux/ui.reducer";
import { selectCurrentCurrency } from "../../redux/currency.reducer";
import {
  selectCartItems,
  selectCartItemsTotal,
  selectCartItemsTotalPrice,
} from "../../redux/cart.reducer";
import CartMenuItem from "../cartMenuItem/CartMenuItem";
import "./CartMenu.scss";

class CartMenu extends React.Component {
  dismissMenuHandler = () => {
    this.props.dismissMenu();
  };

  componentDidMount() {
    window.addEventListener("click", this.dismissMenuHandler);
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.dismissMenuHandler);
  }

  render() {
    const {
      cartItems,
      cartItemsTotalCount,
      cartItemsTotalPrice,
      currentCurrency,
    } = this.props;

    const totalPrice = cartItemsTotalPrice(currentCurrency);

    return (
      <div className="cart-menu" onClick={(e) => e.stopPropagation()}>
        <div className="cart-menu__title">
          My Bag, <span>{cartItemsTotalCount} items</span>
        </div>

        {cartItemsTotalCount ? (
          <div className="cart-menu__items">
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
          <span className="cart-menu__no-items">
            There are no Items in your bag
          </span>
        )}

        <div className="total">
          <span>Total</span>
          <span>
            {currentCurrency.symbol}
            {totalPrice}
          </span>
        </div>

        <div className="cart-menu__buttons">
          <Link to="/checkout">view bag</Link>
          <Link to="/checkout">check out</Link>
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

const mapDispatchToProps = (dispatch) => ({
  dismissMenu: () => dispatch(dismissCartMenu()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartMenu);