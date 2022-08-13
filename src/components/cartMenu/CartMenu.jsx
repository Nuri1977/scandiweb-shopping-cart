import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { dismissCartMenu } from "../../redux/ui.reducer";

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
    return (
      <div className="cart-menu">
        <div className="title">
          My Bag, <span>2 items</span>
        </div>

        <div className="items"></div>

        <div className="total">
          <span>Total</span>
          <span>$100.00</span>
        </div>

        <div className="buttons">
          <Link to="/checkout">view bag</Link>
          <Link to="/checkout">check out</Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = (dispatch) => ({
  dismissMenu: () => dispatch(dismissCartMenu()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartMenu);