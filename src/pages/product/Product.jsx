import React from "react";
import { connect } from "react-redux";
import { compose } from "@reduxjs/toolkit";
import { createStructuredSelector } from "reselect";
import { withNavigation, withParams } from "../../HOC";
import { fetchProductInfo } from "../../api";
import { selectProductPrice } from "../../redux/currency.reducer";
import { addItemToCart } from "../../redux/cart.reducer";
import SpinnerComp from "../../components/spinner/Spinner";
import "./Product.scss";
import sanitizeHtml from "sanitize-html";
import ProductAttribute from "../../components/productAttribute/ProductAttribute";


class ProductPage extends React.Component {
  state = {
    isLoading: false,
    product: null,
    selectedImage: 0,
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    const productId = this.props.params.productId;
    const navigate = this.props.navigate

    this.setState({ isLoading: true });
    fetchProductInfo(productId)
      .then(({ data: { product }, error }) => {
        if (error) {
          navigate("/500");
          return;
        } else if (!product) {
          navigate("/404");
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
      const { addItemToCart, getProductPrice } = this.props;
      const { selectedImage } = this.state;
      const {
        id,
        gallery,
        brand,
        name,
        description,
        prices,
        attributes,
        inStock,
      } = product;

      const price = getProductPrice(prices);

      const safeDescription = sanitizeHtml(description);

      const handleSubmit = (e) => {
        e.preventDefault();
        if (!inStock) return;
        let cartItem = {
          productId: id,
          selectedAttributes: {},
          brand,
          name,
          gallery,
          attributes,
          prices,
        };
        const formData = new FormData(e.target);
        formData.forEach((value, key) => {
          cartItem.selectedAttributes[key] = value;
        });
        console.log(cartItem);
        addItemToCart(cartItem);
      };

      return (
        <div id="product-page">
          <div className="product-page__images">
            <div className="product-page__thumbnails-container">
              {gallery.map((image, idx) => (
                // eslint-disable-next-line jsx-a11y/alt-text
                <img
                  className="product-page__thumbnail"
                  key={idx}
                  onClick={() => this.setState({ selectedImage: idx })}
                  src={image}
                />
              ))}
            </div>
            <img src={gallery[0]} alt="" className="product-page__full-image" />
          </div>
          <div className="product-page__info">
            <form onSubmit={handleSubmit}>
            <h2 className="product-page__info__brand">{brand}</h2>
              <h1 className="product-page__info__name">{name}</h1>
              <div className="product-page__info__attributes">
                {attributes.map((item) => (
                  <ProductAttribute
                    attribute={item}
                    productId={id}
                    key={item.id}
                  />
                ))}
              </div>
              <div className="product-page__info__price">
                <span className="product-page__info__price__title">price:</span>
                <span className="product-page__info__price__value">
                  {price}
                </span>
              </div>

              <button
                className="product-page__info__add-to-cart"
                type="submit"
                disabled={!inStock}
              >
                {inStock ? "add to cart" : "out of stock"}
              </button>
            </form>
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

const mapDispatchToProps = (dispatch) => ({
  addItemToCart: (item) => dispatch(addItemToCart({ item })),
});

const mapStateToProps = createStructuredSelector({
  getProductPrice: (prices) => selectProductPrice(prices),
});

export default compose(
  withNavigation,
  withParams,
  connect(mapStateToProps, mapDispatchToProps)
)(ProductPage);