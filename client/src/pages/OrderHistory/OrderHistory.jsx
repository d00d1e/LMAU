import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { historyOrder } from "../../redux/actions/orderActions";
import { LoadingBox, MessageBox } from "../../components";
import "./orderhistory.css";

export default function OrderHistory() {
  const { loading, error, orders } = useSelector((state) => state.orderHistory);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(historyOrder());
  }, [dispatch]);

  return (
    <div className="order-history-container">
      <h1>Order History</h1>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="error">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.paidAt.substring(0, 10)}</td>
                <td>{order.total.toFixed(2)}</td>
                <td>{order.isPaid ? order.paidAt.substring(0, 10) : "No"}</td>
                <td>
                  {order.isDelivered
                    ? order.isDelivered.substring(0, 10)
                    : "No"}
                </td>
                <td>
                  <button
                    type="button"
                    className="center small"
                    onClick={() => navigate(`/order/${order._id}`)}
                  >
                    ORDER DETAILS
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
