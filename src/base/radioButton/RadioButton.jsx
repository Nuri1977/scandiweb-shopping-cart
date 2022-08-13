import React from "react";

import "./RadioButton.scss";

class RadioButton extends React.Component {
  render() {
    const { value, isSwatch, label, ...props } = this.props;
    return (
      <div className="base-radio-button">
        <input
          type="radio"
          className={isSwatch ? "base-radio-button__swatch" : ""}
          style={{ backgroundColor: isSwatch ? value : null }}
          value={value}
          required
          {...props}
        />
        <label htmlFor={props.id} aria-label={label}>
          {isSwatch ? "" : value}
        </label>
      </div>
    );
  }
}

export default RadioButton;