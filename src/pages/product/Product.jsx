import React from "react";
import { connect } from "react-redux";
import { compose } from "@reduxjs/toolkit";
import { createStructuredSelector } from "reselect";

import { withNavigation, withParams } from "../../HOC";
import { fetchProductInfo } from "../../api";
import { selectCurrentCurrency } from "../../redux/currency.reducer";

import SpinnerComp from "../../components/spinner/Spinner";
import "./Product.scss";

import TestImage from "../../assets/test.png";
import sanitizeHtml from "sanitize-html";

class ProductPage extends React.Component {
  state = {
    isLoading: false,
    product: null,
    selectedImage: 0,
  };

  componentDidMount() {
    const productId = this.props.params.productId;

    this.setState({ isLoading: true });
    fetchProductInfo(productId)
      .then(({ data: { product } }) => {
        if (!product) {
          this.props.navigate("/404");
          return;
        }
        this.setState({ product });
        this.setState({ isLoading: false });
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
        this.props.navigate("/500");
      });
  }

  render() {
    const { isLoading, product } = this.state;

    if (isLoading) return <SpinnerComp />;
    else if (product) {
      const { currentCurrency } = this.props;
      const { selectedImage } = this.state;
      const { gallery, brand, name, description, prices } = product;

      const price = prices.find(
        (p) => p.currency.label === currentCurrency.label
      );

      const safeDescription = sanitizeHtml(description);

      return (
        <div id="product-page">
          <div className="images">
            <div className="thumbnails-container">
              {gallery.map((image, idx) => (
                // <div
                //   className="thumbnail"
                //   key={idx}
                //   style={{ backgroundImage: `url('${image}')` }}
                //   onClick={() => this.setState({ selectedImage: idx })}
                // />

                // TODO: temporary use a test image to save data, remove later
                <div
                  className="thumbnail"
                  key={idx}
                  style={{ backgroundImage: `url('${TestImage}')` }}
                  onClick={() => this.setState({ selectedImage: idx })}
                />
              ))}
            </div>
            {/* <img src={gallery[selectedImage]} alt="" className="full-image" /> */}
            {/* // TODO: temporary use a test image to save data, remove later */}
            <img src={TestImage} alt="" className="full-image" />
          </div>
          <div className="info">
            <h2 className="brand">{brand}</h2>
            <h1 className="name">{name}</h1>
            <div className="sizes">{/* TODO */}</div>
            <div className="price">
              <span className="price-title">price:</span>
              <span className="price-value">
                {price.currency.symbol}
                {price.amount}
              </span>
            </div>
            <button className="add-to-cart">add to cart</button>
            <div
              className="description"
              dangerouslySetInnerHTML={{ __html: safeDescription }}
            />
          </div>
        </div>
      );
    } else return null;
  }
}

const mapStateToProps = createStructuredSelector({
  currentCurrency: selectCurrentCurrency,
});

export default compose(
  withNavigation,
  withParams,
  connect(mapStateToProps)
)(ProductPage);