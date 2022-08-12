import React from "react";

import "./ProductAttribute.scss";

class AttributeOption extends React.Component {
  render() {
    const { isSwatch, label, value, ...props } = this.props;
    if (isSwatch)
      return (
        <div className="product-attribute__option">
          <input
            type="radio"
            {...props}
            style={{ backgroundColor: value }}
            value={value}
            className="swatch"
            required
          />
          <label htmlFor={props.id} aria-label={label} />
        </div>
      );
    else
      return (
        <div className="product-attribute__option">
          <input type="radio" {...props} value={value} required />
          <label htmlFor={props.id}>{label}</label>
        </div>
      );
  }
}

class ProductAttribute extends React.Component {
  render() {
    const { attribute, productId } = this.props;
    return (
      <div className="product-attribute">
        <span className="product-attribute__title">{attribute.name}:</span>
        <div className="product-attribute__options">
          {attribute.items.map(({ value, displayValue, id }, idx) => (
            <AttributeOption
              type="radio"
              name={attribute.id}
              value={value}
              id={productId + attribute.id + id}
              key={productId + attribute.id + id}
              label={displayValue}
              isSwatch={attribute.type === "swatch"}
              defaultChecked={idx === 0}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default ProductAttribute;