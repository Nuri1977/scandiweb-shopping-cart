import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  selectIsCartMenuOpen,
  toggleCartMenu,
  dismissCartMenu,
} from "../../redux/cart.reducer";

import {
  selectIsCurrencyMenuOpen,
  toggleCurrencyMenu,
  dismissCurrencyMenu,
} from "../../redux/currency.reducer";
import CurrencyMenu from "../currencyMenu/CurrencyMenu";

import { ReactComponent as CartSVG } from "../../assets/empty-cart.svg";
import { ReactComponent as LogoSVG } from "../../assets/logo.svg";
import { ReactComponent as ArrowSVG } from "../../assets/down-arrow.svg";

import "./Header.scss";

import { Link } from "react-router-dom";

class Header extends React.Component {
  dismissAllMenus = () => {
    if (this.props.isCurrencyMenuOpen) this.props.dismissCurrencyMenu();
    if (this.props.isCartMenuOpen) this.props.dismissCartMenu();
  };

  componentDidMount() {
    window.addEventListener("click", this.dismissAllMenus);
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.dismissAllMenus);
  }

  render() {
    const { isCurrencyMenuOpen, toggleCurrencyMenu, dismissCurrencyMenu } =
    this.props;
    const { isCartMenuOpen, toggleCartMenu, dismissCartMenu } = this.props;

    const handleOnClickCurrencyIcon = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (isCartMenuOpen) dismissCartMenu();
      toggleCurrencyMenu();
    };

    const handleOnClickCartIcon = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (isCurrencyMenuOpen) dismissCurrencyMenu();
      toggleCartMenu();
    };

    return (
      <header>
        <nav>
          <Link to="/">WOMEN</Link>
          <Link to="/">MEN</Link>
          <Link to="/">KIDS</Link>
        </nav>

        <div className="logo">
          <LogoSVG />
        </div>

        <div className="menus">
          <div className="currency-icon" onClick={handleOnClickCurrencyIcon}>
            <span>$</span>
            <ArrowSVG />
          </div>
          <div className="cart-icon" onClick={handleOnClickCartIcon}>
            <CartSVG />
          </div>
        </div>
        {isCurrencyMenuOpen ? <CurrencyMenu /> : null}
      </header>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isCurrencyMenuOpen: selectIsCurrencyMenuOpen,
  isCartMenuOpen: selectIsCartMenuOpen,
});

const mapDispatchToState = (dispatch) => ({
  toggleCartMenu: () => dispatch(toggleCartMenu()),
  dismissCartMenu: () => dispatch(dismissCartMenu()),
  toggleCurrencyMenu: () => dispatch(toggleCurrencyMenu()),
  dismissCurrencyMenu: () => dispatch(dismissCurrencyMenu()),
});

export default connect(mapStateToProps, mapDispatchToState)(Header);