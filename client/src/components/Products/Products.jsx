import React from "react";
import Product from "../Product/Product";
import data from "../../data";
import "./products.css";

export default function Products() {
  return (
    <>
      <h1 className="products__header">Shop Collections</h1>
      <div className="row center">
        {data.products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </>
  );
}
