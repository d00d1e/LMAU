import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components";
import { Cart, Home, ProductDetails } from "./pages";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route exact path="/cart/:id" element={<Cart />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/products/:id" element={<ProductDetails />} />
          <Route exact path="/" element={<Home />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
