import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import Checkout from "./pages/checkout/Checkout";
import NotFound from "./pages/notFound/NotFound";

class App extends React.Component {
  render() {
    return (
      <div id="App">
          <Header />
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Home />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
      </div>
    );
  }
}

export default App;
