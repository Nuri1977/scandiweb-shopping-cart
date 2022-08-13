import React, { Component } from 'react'
import { Link } from "react-router-dom";
import CartMenuContainer from "../../components/cartMenuItem/CartMenuContainer";
import './Checkout.scss'

export class Checkout extends Component {
  render() {
    return (
      <div id="checkout-page">
        <h1 className="checkout-page__title">cart</h1>
        <CartMenuContainer className="checkout-page__cart-items-container">
          <div className="checkout-page__no-items">
            <span>There are no Items in your bag</span>
            <Link to="/">explore our products</Link>
          </div>
        </CartMenuContainer>
      </div>
    )
  }
}

export default Checkout