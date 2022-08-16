import React, { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";


const CategoryPage = lazy(() => import("./pages/category/Category"));
const ProductPage = lazy(() => import("./pages/product/Product"));
const CheckoutPage = lazy(() => import("./pages/checkout/Checkout"));
const ServerError = lazy(() =>
  import("./pages/serverError/ServerError")
);
const NotFoundPage = lazy(() => import("./pages/notFound/NotFound"));

class AppRoutes extends React.Component {
  render() {
    const { categoryNames } = this.props;

    return (
      <Routes>
        <Route
          path="/"
          element={<Navigate to={"/" + categoryNames[0].name} replace />}
        />
        {categoryNames.map(({ name }) => (
          <Route
            key={name}
            path={`/${name}`}
            element={<CategoryPage categoryName={name} />}
          />
        ))}
        <Route exact path="/product/:productId" element={<ProductPage />} />
        <Route exact path="/checkout" element={<CheckoutPage />} />
        <Route exact path="/500" element={<ServerError />} />
        <Route exact path="/*" element={<NotFoundPage />} />
      </Routes>
    );
  }
}

export default AppRoutes;