import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { getCategoryNamesAsync, selectCategoryNames } from "../../redux/shop.reducer";
import { selectIsCartMenuOpen } from "../../redux/ui.reducer";
import CartIcon from "../cartIcon/CartIcon";
import CurrencyIcon from "../currencyIcon/CurrencyIcon";
import CustomLink from "../customLink/CustomLink";
import { ReactComponent as LogoSVG } from "../../assets/logo.svg";
import "./Header.scss";

class Header extends React.Component {

  componentDidMount() {
    this.props.getCategoryNames();
  }

  render() {
    const { isCartMenuOpen} = this.props;
    const { categoryNames } = this.props;

    return (
      <>
        {isCartMenuOpen ? <div id="overlay" /> : null}
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
            <CurrencyIcon />
            <CartIcon />
          </div>
        </header>
      </>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isCartMenuOpen: selectIsCartMenuOpen,
  categoryNames: selectCategoryNames,
});

const mapDispatchToProps = (dispatch) => ({
  getCategoryNames: () => dispatch(getCategoryNamesAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);