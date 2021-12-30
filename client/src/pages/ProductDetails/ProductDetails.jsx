import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { LoadingBox, MessageBox, Rating } from "../../components";
import { detailsProduct } from "../../redux/actions/productActions";
import "./productdetails.css";

export default function ProductDetails() {
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );
  const { id: productId } = useParams();

  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);

  const handleAddToCart = () => {
    navigate(`/cart/${productId}?qty=${qty}&size=${size}`);
  };

  return (
    <>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="error">Uh oh.. something went wrong...</MessageBox>
      ) : (
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
                src={require(`../../assets/img/products/${product.image}`)}
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
              {product.countInStock > 0 ? (
                <>
                  <div className="select-container">
                    <label fors="quantity">Quantity:</label>
                    <select
                      name="quantity"
                      id="quantity"
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                      required
                    >
                      <option value="">Choose quantity</option>
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="select-container">
                    <label fors="size">Size:</label>
                    <select
                      name="size"
                      id="size"
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                      required
                    >
                      <option value="">Choose Size</option>
                      {product.sizes.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              ) : (
                <>
                  <div className="select-container">
                    <label fors="quantity">Quantity:</label>
                    <select name="quantity" id="quantity" disabled>
                      <option value="">Out Of Stock</option>
                    </select>
                  </div>
                  <div className="select-container">
                    <label fors="quantity">Size:</label>
                    <select name="size" id="size" disabled>
                      <option value="">Out Of Stock</option>
                    </select>
                  </div>
                </>
              )}

              {product.countInStock > 0 ? (
                <button
                  type="sumbit"
                  className="block"
                  onClick={handleAddToCart}
                >
                  ADD TO CART
                </button>
              ) : (
                <button type="sumbit" className="block disabled" disabled>
                  OUT OF STOCK
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
