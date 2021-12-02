import React, { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "..";
import "./products.css";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("/api/products");

      setProducts(data);
    };
    fetchData();
  }, []);

  return (
    <>
      <h1 className="products__header">Shop Products</h1>
      <div className="row center">
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </>
  );
}
