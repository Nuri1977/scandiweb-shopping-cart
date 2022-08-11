import React, { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Category from "./pages/category/Category";

const CheckoutPage = lazy(() => import("./pages/checkout/Checkout"));
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
            element={<Category categoryName={name} />}
          />
        ))}
        <Route exact path="/checkout" element={<CheckoutPage />} />
        <Route exact path="/*" element={<NotFoundPage />} />
      </Routes>
    );
  }
}

export default AppRoutes;