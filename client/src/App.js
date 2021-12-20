import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components";
import {
  Cart,
  Home,
  Login,
  Payment,
  Checkout,
  ProductDetails,
  Register,
  Shipping,
} from "./pages";
import OrderDetails from "./pages/OrderDetails/OrderDetails";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route exact path="/order/:id" element={<OrderDetails />} />
          <Route exact path="/checkout" element={<Checkout />} />
          <Route exact path="/payment" element={<Payment />} />
          <Route exact path="/shipping" element={<Shipping />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/cart/:id" element={<Cart />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/products/:id" element={<ProductDetails />} />
          <Route exact path="/" element={<Home />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
