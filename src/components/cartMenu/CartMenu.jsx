import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { dismissCartMenu } from "../../redux/ui.reducer";
import { selectCartItemsTotal } from "../../redux/cart.reducer";
import CartMenuContainer from "../cartMenuItem/CartMenuContainer";
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
    const { cartItemsTotalCount, dismissMenu } = this.props;

    return (
      <div className="cart-menu" onClick={(e) => e.stopPropagation()}>
        <div className="cart-menu__title">
          My Bag, <span>{cartItemsTotalCount} items</span>
        </div>
        <CartMenuContainer className="cart-menu__cart-items-container">
          <span className="cart-menu__no-items">
            There are no Items in your bag
          </span>
        </CartMenuContainer>

        <div className="cart-menu__buttons">
          <Link to="/checkout" onClick={dismissMenu}>
            view bag
          </Link>
          <Link to="/checkout" onClick={dismissMenu}>
            check out
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  cartItemsTotalCount: selectCartItemsTotal,
});

const mapDispatchToProps = (dispatch) => ({
  dismissMenu: () => dispatch(dismissCartMenu()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartMenu);