import React, { Suspense } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import "./App.scss";
import Spinner from "./components/spinner/Spinner";
import Header from "./components/header/Header";
import AppRoutes from "./routes";

import {
  getCategoryNamesAsync,
  selectCategoryNames,
  selectErrorMsg,
  selectIsLoading,
} from "./redux/shop.reducer";

class App extends React.Component {
  componentDidMount() {
    this.props.fetchCategoryNames();
  }

  render() {
    const { categoryNames, isLoading, errorMsg } = this.props;

    return (
      <div>
        <Header />
        <main id="page-container">
          {!isLoading && !errorMsg && categoryNames ? (
            <Suspense fallback={<Spinner />}>
              <AppRoutes categoryNames={categoryNames} />
            </Suspense>
          ) : null}
        </main>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  categoryNames: selectCategoryNames,
  isLoading: selectIsLoading,
  errorMsg: selectErrorMsg,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCategoryNames: () => dispatch(getCategoryNamesAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

