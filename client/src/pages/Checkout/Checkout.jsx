import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CheckoutSteps, LoadingBox, MessageBox } from "../../components";
import { createOrder } from "../../redux/actions/orderActions";
import "./checkout.css";
import { ORDER_CREATE_RESET } from "../../redux/constants/orderConstants";

export default function Checkout() {
  const cart = useSelector((state) => state.cart);
  const { loading, success, error, order } = useSelector(
    (state) => state.orderCreate
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!cart.paymentMethod) {
    navigate("/payment");
  }

  const numItems = cart.cartItems.reduce((a, c) => a + c.qty, 0);
  const toPrice = (num) => Number(num.toFixed(2));
  cart.subtotal = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cart.shipping = toPrice(5);
  cart.tax = toPrice(0.05 * cart.subtotal);
  cart.total = cart.subtotal + cart.shipping + cart.tax;

  const handleCheckout = () => {
    dispatch(
      createOrder({
        ...cart,
        orderItems: cart.cartItems,
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
              {cart.shippingAddress.fullName} <br />
              {cart.shippingAddress.address} <br />
              {cart.shippingAddress.city}, {cart.shippingAddress.zipCode} <br />
              {cart.shippingAddress.country}
            </span>
          </div>
          <div>
            <h2>Payment Method</h2>
            <span>{cart.paymentMethod}</span>
          </div>
          <div>
            <h2>Items</h2>
            <div className="items-container">
              {cart.cartItems.map((i) => (
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
            <p>{cart.cartItems ? `$${cart.subtotal.toFixed(2)}` : "$0.00"}</p>
          </div>
          <div className="taxes">
            <p>TAXES</p>
            <p>{numItems ? `$${cart.tax}` : "--"}</p>
          </div>
          <div className="shipping">
            <p>SHIPPING </p>
            <p>{numItems ? `$ ${cart.shipping.toFixed(2)}` : "--"}</p>
          </div>
          <hr />
          <div className="total">
            <strong>TOTAL</strong>
            <strong>
              {numItems
                ? `$
              ${cart.total}`
                : "$0.00"}
            </strong>
          </div>
          <button
            type="button"
            className="block"
            onClick={handleCheckout}
            disabled={cart.cartItems.length === 0}
          >
            PLACE ORDER
          </button>

          {loading && <LoadingBox />}
          {error && <MessageBox variant="error">{error}</MessageBox>}
        </div>
      </div>
    </div>
  );
}
