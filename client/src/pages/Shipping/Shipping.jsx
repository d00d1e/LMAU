import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CheckoutSteps } from "../../components";
import { saveShippingAddress } from "../../redux/actions/cartActions";
import "./shipping.css";

export default function Shipping() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.userSignin);
  const { shippingAddress } = useSelector((state) => state.cart);

  const [fullName, setFullName] = useState(shippingAddress?.fullName || "");
  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [zipCode, setZipCode] = useState(shippingAddress?.zipCode || "");
  const [country, setCountry] = useState(shippingAddress?.country || "");

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo, navigate]);

  const handleSubmit = () => {
    dispatch(
      saveShippingAddress({ fullName, address, city, zipCode, country })
    );
    navigate("/payment");
  };

  return (
    <div className="shipping-container">
      <CheckoutSteps step1 step2 />
      <div className="shipping-wrapper">
        <h1>SHIPPING INFORMATION</h1>
        <form className="shipping-form" onSubmit={handleSubmit}>
          <label htmlFor="fullName">Full Name</label>
          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <label htmlFor="address">Address</label>
          <input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />

          <label htmlFor="city">City</label>
          <input
            id="city"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />

          <label htmlFor="zipCode">Zip Code</label>
          <input
            id="zipCode"
            type="text"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            required
          />

          <label htmlFor="country">Country</label>
          <input
            id="country"
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />

          <button className="center" type="submit">
            CONTINUE TO PAYMENT
          </button>
        </form>
      </div>
    </div>
  );
}
