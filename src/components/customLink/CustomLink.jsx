import React from "react";
import { Link } from "react-router-dom";

import { withLocation } from "../../helpers/HocNavigation";

class NavLink extends React.Component {
  render() {
    const { children, location, to, ...props } = this.props;

    const isActive =
      location.pathname === "/" + to ||
      (location.pathname === "/" && to === "all")
        ? "active"
        : "";

    return (
      <Link to={to} {...props} className={isActive}>
        {children}
      </Link>
    );
  }
}

export default withLocation(NavLink);