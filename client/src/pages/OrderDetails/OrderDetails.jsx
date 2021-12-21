import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PayPalButton } from "react-paypal-button-v2";
import { detailsOrder } from "../../redux/actions/orderActions";
import "./orderdetails.css";

export default function OrderDetails() {
  const { id: orderId } = useParams();
  const { loading, error, order } = useSelector((state) => state.orderDetails);
  const [sdkReady, setSdkReady] = useState(false);
  const dispatch = useDispatch();

  const handlePaypalSuccess = () => {};

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await axios.get("/api/config/paypal"); //paypal client id from backend
      const script = document.createElement("script");

      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };

      document.body.appendChild(script);
    };

    if (!order || (order && order._id !== orderId)) {
      dispatch(detailsOrder(orderId));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, order, orderId, sdkReady]);

  return loading ? (
    "Loading..."
  ) : error ? (
    { error }
  ) : (
    <div className="checkout-container">
      <div className="checkout-wrapper">
        <div className="checkout-summary">
          <h1>Order {order.isPaid && `#${order._id}`}</h1>
          <div>
            <h2>Shipping Address</h2>
            <span>
              {order.shippingAddress.fullName} <br />
              {order.shippingAddress.address} <br />
              {order.shippingAddress.city}, {order.shippingAddress.zipCode}{" "}
              <br />
              {order.shippingAddress.country}
            </span>
            <div>
              {order.isDelivered
                ? `Delivered at ${order.deliveredAt}`
                : "NOT DELIVERED"}
            </div>
          </div>
          <div>
            <h2>Payment Method</h2>
            <span>{order.paymentMethod}</span>
            <div>{order.isPaid ? "PAID" : "NOT PAID"}</div>
          </div>
          <div>
            <h2>Items</h2>
            <div className="items-container">
              {order.orderItems.map((i) => (
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
            <p>{`$${order.subtotal.toFixed(2)}`}</p>
          </div>
          <div className="taxes">
            <p>TAXES</p>
            <p>{`$${order.tax.toFixed(2)}`}</p>
          </div>
          <div className="shipping">
            <p>SHIPPING </p>
            <p>{`$ ${order.shipping.toFixed(2)}`}</p>
          </div>
          <hr />
          <div className="total">
            <strong>TOTAL</strong>
            <strong>
              {`$
              ${order.total.toFixed(2)}`}
            </strong>
          </div>
          {!order.isPaid && (
            <div>
              {!sdkReady ? (
                "Loading..."
              ) : (
                <PayPalButton
                  amount={order.total}
                  onSuccess={handlePaypalSuccess}
                ></PayPalButton>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
