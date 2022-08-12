import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  selectIsCartMenuOpen,
  toggleCartMenu,
  dismissCartMenu,
  selectCartItemsTotal,
} from "../../redux/cart.reducer";

import {
  selectIsCurrencyMenuOpen,
  toggleCurrencyMenu,
  dismissCurrencyMenu,
  selectCurrentCurrency,
} from "../../redux/currency.reducer";

import {
  getCategoryNamesAsync,
  selectCategoryNames,
} from "../../redux/shop.reducer";

import CurrencyMenu from "../currencyMenu/CurrencyMenu";
import CustomLink from "../customLink/CustomLink";

import { ReactComponent as CartSVG } from "../../assets/empty-cart.svg";
import { ReactComponent as LogoSVG } from "../../assets/logo.svg";
import { ReactComponent as ArrowSVG } from "../../assets/down-arrow.svg";

import "./Header.scss";

class Header extends React.Component {
  dismissAllMenus = () => {
    if (this.props.isCurrencyMenuOpen) this.props.dismissCurrencyMenu();
    if (this.props.isCartMenuOpen) this.props.dismissCartMenu();
  };

  componentDidMount() {
    window.addEventListener("click", this.dismissAllMenus);
    this.props.getCategoryNames();
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.dismissAllMenus);
  }

  render() {
    const { isCurrencyMenuOpen, toggleCurrencyMenu, dismissCurrencyMenu } =
      this.props;
    const { isCartMenuOpen, toggleCartMenu, dismissCartMenu, cartItemsTotal } = this.props;

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

    const { categoryNames, currentCurrency } = this.props;

    return (
      <header>
        <nav>
          {categoryNames
              ? categoryNames.map(({ name }) => (
                  <CustomLink to={name} key={name}>
                    {name}
                  </CustomLink>
                ))
              : null}
        </nav>

        <div className="logo">
          <LogoSVG />
        </div>

        <div className="menus">
          <div className="currency-icon" onClick={handleOnClickCurrencyIcon}>
          <span>{currentCurrency.symbol}</span>
            <ArrowSVG />
          </div>
          <div className="cart-icon" onClick={handleOnClickCartIcon}>
            <div className="cart-icon__inner">
              <CartSVG />
              {cartItemsTotal > 0 ? (
                <span className="cart-icon__label">
                  {cartItemsTotal > 9 ? "+9" : cartItemsTotal}
                </span>
              ) : null}
            </div>
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
  categoryNames: selectCategoryNames,
  currentCurrency: selectCurrentCurrency,
  cartItemsTotal: selectCartItemsTotal,
});

const mapDispatchToProps = (dispatch) => ({
  toggleCartMenu: () => dispatch(toggleCartMenu()),
  dismissCartMenu: () => dispatch(dismissCartMenu()),
  toggleCurrencyMenu: () => dispatch(toggleCurrencyMenu()),
  dismissCurrencyMenu: () => dispatch(dismissCurrencyMenu()),
  getCategoryNames: () => dispatch(getCategoryNamesAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);