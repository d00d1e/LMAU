import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CheckoutSteps } from "../../components";
import { createOrder } from "../../redux/actions/orderActions";
import "./checkout.css";
import { ORDER_CREATE_RESET } from "../../redux/constants/orderConstants";

export default function Checkout() {
  const { shippingAddress, paymentMethod, cartItems } = useSelector(
    (state) => state.cart
  );
  const { loading, success, error, order } = useSelector(
    (state) => state.orderCreate
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!paymentMethod) {
    navigate("/payment");
  }

  const numItems = cartItems.reduce((a, c) => a + c.qty, 0);
  const toPrice = (num) => Number(num.toFixed(2));
  cartItems.subtotal = toPrice(
    cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cartItems.shipping = 5.0;
  cartItems.tax = toPrice(0.05 * cartItems.subtotal);
  cartItems.total = cartItems.subtotal + cartItems.shipping + cartItems.tax;

  const handleCheckout = () => {
    dispatch(
      createOrder({
        shippingAddress,
        paymentMethod,
        orderItems: cartItems,
      })
    );
  };

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [success, dispatch, navigate, order]);

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
            <p>{cartItems ? `$${cartItems.subtotal.toFixed(2)}` : "$0.00"}</p>
          </div>
          <div className="taxes">
            <p>TAXES</p>
            <p>{numItems ? `$${cartItems.tax.toFixed(2)}` : "--"}</p>
          </div>
          <div className="shipping">
            <p>SHIPPING </p>
            <p>{numItems ? `$ ${cartItems.shipping.toFixed(2)}` : "--"}</p>
          </div>
          <hr />
          <div className="total">
            <strong>TOTAL</strong>
            <strong>
              {numItems
                ? `$
              ${cartItems.total.toFixed(2)}`
                : "$0.00"}
            </strong>
          </div>
          <button
            type="button"
            className="block"
            onClick={handleCheckout}
            disabled={cartItems.length === 0}
          >
            PLACE ORDER
          </button>

          {loading && "Loading..."}
          {error && <span>{error}</span>}
        </div>
      </div>
    </div>
  );
}
