import React, { Suspense } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import "./App.scss";
import Spinner from "./components/spinner/Spinner";
import Header from "./components/header/Header";
import ServerError from "./pages/serverError/ServerError";
import AppRoutes from "./routes";

import {
  getCategoryNamesAsync,
  selectCategoryNames,
  selectHasNetworkError,
  selectIsLoading,
} from "./redux/shop.reducer";

class App extends React.Component {
  componentDidMount() {
    this.props.fetchCategoryNames();
  }

  render() {
    const { categoryNames, isLoading, hasNetworkError} = this.props;

    return (
      <>
        {isLoading ? (
          <Spinner />
        ) : hasNetworkError ? (
          <ServerError />
        ) : (
          <>
            <Header />
            <main id="page-container">
              <Suspense fallback={<Spinner />}>
                <AppRoutes categoryNames={categoryNames} />
              </Suspense>
            </main>
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  categoryNames: selectCategoryNames,
  isLoading: selectIsLoading,
  hasNetworkError: selectHasNetworkError,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCategoryNames: () => dispatch(getCategoryNamesAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

