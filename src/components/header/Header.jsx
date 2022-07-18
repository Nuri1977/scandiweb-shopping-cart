import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  selectIsCartMenuOpen,
  toggleCartMenu,
  dismissCartMenu,
} from "../../redux/cart.reducer";

import { ReactComponent as CartSVG } from "../../assets/empty-cart.svg";
import { ReactComponent as LogoSVG } from "../../assets/logo.svg";
import { ReactComponent as ArrowSVG } from "../../assets/down-arrow.svg";

import "./Header.scss";

import { Link } from "react-router-dom";

class Header extends React.Component {
  dismissAllMenus = () => {
    if (this.props.isCartMenuOpen) this.props.dismissCartMenu();
  };

  componentDidMount() {
    window.addEventListener("click", this.dismissAllMenus);
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.dismissAllMenus);
  }

  render() {
    const { isCartMenuOpen, toggleCartMenu} = this.props;

    const handleOnClickCartIcon = (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log(isCartMenuOpen)
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
          <div className="currency-icon">
            <span>$</span>
            <ArrowSVG />
          </div>
          <div className="cart-icon" onClick={handleOnClickCartIcon}>
            <CartSVG />
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isCartMenuOpen: selectIsCartMenuOpen,
});

const mapDispatchToState = (dispatch) => ({
  toggleCartMenu: () => dispatch(toggleCartMenu()),
  dismissCartMenu: () => dispatch(dismissCartMenu()),
});

export default connect(mapStateToProps, mapDispatchToState)(Header);