import React from "react";

import "./CurrencyMenu.scss";

class CurrencyMenu extends React.Component {
  render() {
    return (
      <div className="currency-menu">
        <div className="item">
          <span>$</span>
          <span>USD</span>
        </div>
      </div>
    );
  }
}

export default CurrencyMenu;