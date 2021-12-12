import React from "react";
import "./checkoutsteps.css";

export default function CheckoutSteps(props) {
  return (
    <div className="row checkout-steps">
      <div className={props.step1 && "active"}>
        <span>Login</span>
      </div>
      <div className={props.step2 && "active"}>
        <span>Shipping</span>
      </div>
      <div className={props.step3 && "active"}>
        <span>Payment</span>
      </div>
      <div className={props.step4 && "active"}>
        <span>Place Order</span>
      </div>
    </div>
  );
}
