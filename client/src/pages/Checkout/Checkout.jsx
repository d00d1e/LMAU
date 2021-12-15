import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CheckoutSteps } from "../../components";
import "./checkout.css";

export default function Checkout() {
  const { shippingAddress, paymentMethod, cartItems } = useSelector(
    (state) => state.cart
  );
  const navigate = useNavigate();

  if (!paymentMethod) {
    navigate("/payment");
  }

  const handlePlaceOrder = () => {
    //TODO: dispatch placeorder action
  };

  return (
    <div className="checkout-container">
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="checkout-wrapper">
        <h1>Order Summary</h1>
        <div className="checkout-summary">
          <div>
            <h2>Shipping Address</h2>
            <span>
              {shippingAddress.fullName} <br />
              {shippingAddress.address} <br />
              {shippingAddress.city}, {shippingAddress.zipCode} <br />
              {shippingAddress.country}
            </span>
          </div>
          <div>
            <h2>Payment Method</h2>
            <span>{paymentMethod}</span>
          </div>
          <div>
            <h2>Items</h2>
            <div className="items-container">
              {cartItems.map((i) => (
                <div key={i.product} className="item">
                  <div>
                    <Link to={`/products/${i.product}`}>
                      <img
                        className="xsmall"
                        src={require(`../../assets/img/products/${i.image}`)}
                        alt={i.title}
                      />
                    </Link>
                  </div>
                  <div>
                    {i.title} <br />
                    {i.size}
                  </div>
                  <div>
                    x&nbsp;{i.qty} <br />${i.price}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="checkout-total">
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
            <strong>TOTAL</strong>
            <strong>
              {cartItems.reduce((a, c) => a + c.qty, 0)
                ? `$
              ${(
                cartItems.reduce((a, c) => a + c.price * c.qty, 0) +
                cartItems.reduce((a, c) => a + c.price * c.qty, 0) * 0.05 +
                5
              ).toFixed(2)}`
                : "$0.00"}
            </strong>
          </div>
          <button
            type="button"
            className="block"
            onClick={handlePlaceOrder}
            disabled={cartItems.length === 0}
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    </div>
  );
}
