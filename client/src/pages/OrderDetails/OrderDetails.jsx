import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { detailsOrder } from "../../redux/actions/orderActions";
import "./orderdetails.css";

export default function OrderDetails() {
  const { id: orderId } = useParams();
  const { loading, error, order } = useSelector((state) => state.orderDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsOrder(orderId));
  }, [dispatch, orderId]);

  return loading ? (
    "Loading..."
  ) : error ? (
    { error }
  ) : (
    <div className="checkout-container">
      <div className="checkout-wrapper">
        <h1>Order Confirmation #{order._id}</h1>
        <div className="checkout-summary">
          <div>
            <h2>Shipping Address</h2>
            <span>
              {order.shippingAddress.fullName} <br />
              {order.shippingAddress.address} <br />
              {order.shippingAddress.city}, {order.shippingAddress.zipCode}{" "}
              <br />
              {order.shippingAddress.country}
            </span>
          </div>
          <div>
            <h2>Payment Method</h2>
            <span>{order.paymentMethod}</span>
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
        </div>
      </div>
    </div>
  );
}
