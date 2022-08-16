import React from "react";
import { map } from "lodash";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { addItemToCart, removeItemFromCart } from "../../redux/cart.reducer";
import { selectProductPrice } from "../../redux/currency.reducer";
import { ReactComponent as AddSVG } from "../../assets/add-sign.svg";
import { ReactComponent as SubSVG } from "../../assets/sub-sign.svg";
import { ReactComponent as LeftArrowSVG } from "../../assets/arrow-left.svg";
import { ReactComponent as RightArrowSVG } from "../../assets/arrow-right.svg";
import TestImage from "../../assets/test.png";
import "./CartMenuItem.scss";

class CartMenuItem extends React.Component {
  state = {
    selectedImageIdx: 0,
  };

  arrowOnClickHandler = (toLeft = true) => {
    const { selectedImageIdx } = this.state;
    const { gallery } = this.props.item;

    console.log(gallery.length, selectedImageIdx);

    if (toLeft) {
      if (selectedImageIdx === 0)
        this.setState({ selectedImageIdx: gallery.length - 1 });
      else this.setState({ selectedImageIdx: selectedImageIdx - 1 });
    } else {
      if (selectedImageIdx + 1 === gallery.length)
        this.setState({ selectedImageIdx: 0 });
      else this.setState({ selectedImageIdx: selectedImageIdx + 1 });
    }
  };

  render() {
    const { item, increase, decrease, getProductPrice, displayThumbnailArrows } = this.props;
    const { brand, name, gallery, quantity, selectedAttributes, prices } = item;

    const price = getProductPrice(prices);

    const displayedAttributes = map(selectedAttributes, (value, key) => {
      const isYesNo = ["yes", "no"].includes(value.toLowerCase());
      const isSwatch = value.startsWith("#");

      return (
        <span
          key={key}
          className={`cart-menu-item__attribute
          ${
            value.toLowerCase() === "no" ? "cart-menu-item__attribute__no" : ""
          }`}
          style={{ backgroundColor: isSwatch ? value : "initial" }}
        >
        {isSwatch ? "" : isYesNo ? key : value}
        </span>
      );
    });

    return (
      <div className="cart-menu-item__left">
        <div className="cart-menu-item__info">
          <div>
            <h2 className="cart-menu-item__info__brand">{brand}</h2>
            <h1 className="cart-menu-item__info__name">{name}</h1>
            <span className="cart-menu-item__info__price">{price}</span>
          </div>
          <div className="cart-menu-item__attributes">
            {displayedAttributes}
          </div>
        </div>
        <div className="cart-menu-item__quantity">
          <div
            className="cart-menu-item__quantity__button"
            onClick={() => increase(item)}
          >
            <AddSVG />
          </div>
          <span className="cart-menu-item__quantity__value">{quantity}</span>
          <div
            className="cart-menu-item__quantity__button"
            onClick={() => decrease(item)}
          >
            <SubSVG />
          </div>
        </div>
        <div
          className="cart-menu-item__thumbnail"
          style={{ backgroundImage: `url('${gallery[this.state.selectedImageIdx]}')` }}
        >
          {displayThumbnailArrows && gallery.length > 1 ? (
            <>
              <div
                className="cart-item__thumbnail__button-container"
                onClick={() => this.arrowOnClickHandler()}
              >
                <LeftArrowSVG className="cart-item__thumbnail__left-arrow" />
              </div>
              <div
                className="cart-item__thumbnail__button-container"
                onClick={() => this.arrowOnClickHandler(false)}
              >
                <RightArrowSVG className="cart-item__thumbnail__right-arrow" />
              </div>
            </>
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  getProductPrice: (prices) => selectProductPrice(prices),
});

const mapDispatchToProps = (dispatch) => ({
  increase: (item) => dispatch(addItemToCart({ item })),
  decrease: (item) => dispatch(removeItemFromCart({ item })),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartMenuItem);