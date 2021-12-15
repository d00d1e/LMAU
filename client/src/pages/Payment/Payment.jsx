import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CheckoutSteps } from "../../components";
import { savePaymentMethod } from "../../redux/actions/cartActions";
import "./payment.css";

export default function Payment() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const { userInfo } = useSelector((state) => state.userSignin);
  const { shippingAddress } = useSelector((state) => state.cart);

  useEffect(() => {
    if (!shippingAddress || !userInfo) {
      navigate("/shipping");
    }
  }, [shippingAddress, userInfo, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(savePaymentMethod(paymentMethod));
    navigate("/checkout");
  };

  return (
    <div className="payment-container">
      <CheckoutSteps step1 step2 step3 />
      <div className="payment-wrapper" onSubmit={handleSubmit}>
        <h1>PAYMENT METHOD</h1>
        <form className="payment-form">
          <div className="radio">
            <input
              type="radio"
              id="paypal"
              value="PayPal"
              name="paymentMethod"
              required
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="paypal">PayPal</label>
          </div>
          <div className="radio">
            <input
              type="radio"
              id="stripe"
              value="Stripe"
              name="paymentMethod"
              required
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="paypal">Stripe</label>
          </div>
          <button className="center">CONTINUE</button>
        </form>
      </div>
    </div>
  );
}
