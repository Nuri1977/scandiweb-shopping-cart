import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCategoryNames } from "../../redux/shop.reducer";

import "./NavMenu.scss";

import CustomLink from "../customLink/CustomLink";

class NavMenu extends React.Component {
  render() {
    const { routes } = this.props;
    return (
      <nav className="nav-menu">
        {routes
          ? routes.map(({ name }) => (
              <CustomLink to={name} key={name}>
                {name}
              </CustomLink>
            ))
          : null}
      </nav>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  routes: selectCategoryNames,
});

export default connect(mapStateToProps)(NavMenu);