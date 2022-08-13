import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCartItemsTotal } from "../../redux/cart.reducer";
import { selectIsCartMenuOpen, toggleCartMenu } from "../../redux/ui.reducer";

import { ReactComponent as CartSVG } from "../../assets/empty-cart.svg";

import "./CartIcon.scss";

import CartMenu from "../cartMenu/CartMenu";

class CartIcon extends React.Component {
  render() {
    const { isMenuOpen, toggleMenu, itemsCount } = this.props;

    const handleOnClick = (e) => {
      e.stopPropagation();
      toggleMenu();
    };

    return (
      <>
        <div
          className={`cart-icon ${isMenuOpen ? "active" : ""}`}
          onClick={handleOnClick}
        >
          <div className="inner">
            <CartSVG />
            {itemsCount > 0 ? (
              <span className="label">
                {itemsCount > 9 ? "+9" : itemsCount}
              </span>
            ) : null}
          </div>
        </div>
        {isMenuOpen ? <CartMenu /> : null}
      </>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  itemsCount: selectCartItemsTotal,
  isMenuOpen: selectIsCartMenuOpen,
});

const mapDispatchToProps = (dispatch) => ({
  toggleMenu: () => dispatch(toggleCartMenu()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);