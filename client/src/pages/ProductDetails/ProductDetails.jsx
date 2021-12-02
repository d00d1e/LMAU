import React from "react";
import { useParams } from "react-router-dom";
import { Rating } from "../../components";
import data from "../../data";
import "./productdetails.css";

export default function ProductDetails({ props }) {
  const { id } = useParams();
  const product = data.products.find((i) => i._id === id);

  if (!product) {
    return <div>Product Not Found</div>;
  }

  return (
    <div className="details__container">
      <div className="details__heading">
        <h1>{product.title}</h1>
        <div className="details__rating">
          <Rating rating={product.rating} numReviews={product.numReviews} />
          &nbsp;
          {product.numReviews} reviews
        </div>
      </div>
      <div className="details__wrapper">
        <div className="details__image">
          <img
            className="large"
            src={require(`../../assets/img/products/${product.image}`).default}
            alt={product.title}
          />
        </div>
        <div className="details__description">
          <p className="details__price">
            ${product.price} <sup>USD</sup>
          </p>
          <p className="in-stock">
            {product.countInStock > 0 ? (
              <span className="success">
                <i className="far fa-check-circle"></i> In Stock
              </span>
            ) : (
              <span className="error">
                <i className="far fa-times-circle"></i> Out Of Stock
              </span>
            )}
          </p>
          <p>{product.description}</p>
          <div className="select-container">
            Quantity:
            <select name="quantity" id="quantity">
              <option value="">Choose quantity</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="select-container">
            Size:
            <select name="size" id="size">
              <option value="">Choose size</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <button type="sumbit" className="block">
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
}
