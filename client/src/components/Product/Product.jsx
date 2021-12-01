import React from "react";
import { Link } from "react-router-dom";
import Rating from "../Rating/Rating";
import "./product.css";

export default function Product({ product }) {
  return (
    <div key={product._id} className="card">
      <Link to={`/products/${product._id}`}>
        <img
          className="medium"
          src={require(`../../assets/img/products/${product.image}`).default}
          alt={product.title}
        />
      </Link>
      <div className="card-body">
        <Link to={`/products/${product._id}`}>
          <h2>{product.title}</h2>
        </Link>
        <div className="ratings">
          <Rating rating={product.rating} numReviews={product.numReviews} />
          &nbsp;
          <span>({product.numReviews})</span>
        </div>
        <p className="price">${product.price}</p>
      </div>
    </div>
  );
}
