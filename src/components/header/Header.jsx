import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectIsCartMenuOpen } from "../../redux/ui.reducer";
import CartIcon from "../cartIcon/CartIcon";
import CurrencyIcon from "../currencyIcon/CurrencyIcon";
import NavMenu from "../navMenu/NavMenu";
import { ReactComponent as LogoSVG } from "../../assets/logo.svg";
import "./Header.scss";

class Header extends React.Component {

  render() {
    const { isCartMenuOpen} = this.props;

    return (
      <>
        {isCartMenuOpen ? <div id="overlay" /> : null}
          <header>
          <div className="header__navbar">
            <NavMenu />
            <div className="header__logo">
              <LogoSVG />
            </div>
            <div className="header__right-side">
              <CurrencyIcon />
              <CartIcon />
            </div>
          </div>
        </header>
      </>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isCartMenuOpen: selectIsCartMenuOpen,
});


export default connect(mapStateToProps)(Header);