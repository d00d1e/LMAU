import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import { addToCart, removeFromCart } from "../../redux/actions/cartActions";
import "./cart.css";

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: productId } = useParams();

  const { search } = useLocation();
  const qtyInUrl = new URLSearchParams(search).get("qty");
  const sizeInUrl = new URLSearchParams(search).get("size");
  const qty = qtyInUrl ? Number(qtyInUrl) : 1;
  const size = sizeInUrl ? String(sizeInUrl) : "S";

  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty, size));
    }
  }, [dispatch, productId, qty, size]);

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
    navigate("/cart");
  };

  const handleCheckout = () => {
    navigate(`/signin?redirect=/shipping`);
  };

  return (
    <div className="cart-container">
      <div className="cart">
        <h1>
          {cartItems.reduce((a, c) => a + c.qty, 0) > 1
            ? `${cartItems.reduce((a, c) => a + c.qty, 0)} items in your cart`
            : cartItems.reduce((a, c) => a + c.qyt, 0) === 1
            ? `${cartItems.reduce((a, c) => a + c.qty, 0)} item in your cart`
            : "Your Cart"}
        </h1>
        <hr />
        {cartItems.length > 0 ? (
          <ul className="cart-items-list">
            {cartItems.map((i) => (
              <li key={i.product}>
                <div className="cart-item-container">
                  <Link to={`/products/${i.product}`}>
                    <img
                      className="small cart-img"
                      src={require(`../../assets/img/products/${i.image}`)}
                      alt={i.title}
                    />
                  </Link>
                  <div className="cart-item">
                    <div className="cart-item-description">
                      <Link to={`/products/${i.product}`}> {i.title}</Link>
                      <span>{i.size}</span>
                      <select
                        value={i.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(i.product, Number(e.target.value), i.size)
                          )
                        }
                      >
                        {[...Array(i.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="cart-instock">
                      {i.countInStock > 0 && (
                        <>
                          <p className="success">In Stock</p>
                          <span>Ready to ship</span>
                        </>
                      )}
                    </div>
                    <div className="cart-item-actions">
                      ${i.price}
                      <button
                        className="remove"
                        type="button"
                        onClick={() => handleRemoveFromCart(i.product)}
                      >
                        REMOVE
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <>
            <p className="cart-links">
              Nothing's here yet! Explore our most popular categories like{" "}
              <Link to="/">T-Shirts</Link> or <Link to="/">Accessories</Link>
            </p>
            <Link to="/" className="button">
              SHOP ALL ITEMS
            </Link>
          </>
        )}
      </div>

      <div className="cart-checkout">
        <h1>Cart Summary</h1>
        <hr />
        <div className="subtotal">
          <p>SUBTOTAL</p>
          <p>
            {cartItems
              ? `$${cartItems
                  .reduce((a, c) => a + c.price * c.qty, 0)
                  .toFixed(2)}`
              : "$0.00"}
          </p>
        </div>
        <div className="taxes">
          <p>TAXES</p>
          <p>
            {cartItems.reduce((a, c) => a + c.qty, 0)
              ? `$${(
                  cartItems.reduce((a, c) => a + c.price * c.qty, 0) * 0.05
                ).toFixed(2)}`
              : "--"}
          </p>
        </div>
        <div className="shipping">
          <p>SHIPPING </p>
          <p>{cartItems.reduce((a, c) => a + c.qty, 0) ? "$5.00" : "--"}</p>
        </div>
        <hr />
        <div className="total">
          <p>TOTAL</p>
          <p>
            {cartItems.reduce((a, c) => a + c.qty, 0)
              ? `$
              ${(
                cartItems.reduce((a, c) => a + c.price * c.qty, 0) +
                cartItems.reduce((a, c) => a + c.price * c.qty, 0) * 0.05 +
                5
              ).toFixed(2)}`
              : "$0.00"}
          </p>
        </div>
        <button
          type="button"
          className="block"
          onClick={handleCheckout}
          disabled={cartItems.length === 0}
        >
          CHECKOUT
        </button>
        <div className="checkout-info">
          <span>
            <i className="fas fa-shipping-fast"></i> Fast shipping
          </span>
          <span>
            <i className="fas fa-box"></i> Easy 30-Day Returns
          </span>
        </div>
      </div>
    </div>
  );
}
