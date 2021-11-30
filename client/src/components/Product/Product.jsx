import React from "react";
import Rating from "../Rating/Rating";
import "./product.css";

export default function Product({ product }) {
  return (
    <div key={product._id} className="card">
      <a href={`/products/${product._id}`}>
        <img
          className="medium"
          src={require(`../../assets/img/products/${product.image}`).default}
          alt={product.title}
        />
      </a>
      <div className="card-body">
        <a href={`/products/${product._id}`}>
          <h2>{product.title}</h2>
        </a>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <div className="price">${product.price}</div>
      </div>
    </div>
  );
}
