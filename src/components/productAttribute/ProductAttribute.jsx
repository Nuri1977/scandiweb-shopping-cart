import React from "react";
import RadioButton from "../../base/radioButton/RadioButton";
import "./ProductAttribute.scss";

class ProductAttribute extends React.Component {
  render() {
    const { attribute, productId } = this.props;
    return (
      <div className="product-attribute">
        <span className="product-attribute__title">{attribute.name}:</span>
        <div className="product-attribute__options">
          {attribute.items.map(({ value, displayValue, id }, idx) => (
            <RadioButton
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