import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./header.css";

export default function Header() {
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <header className="row">
      <div>
        <Link className="brand" to="/">
          LMAU
        </Link>
      </div>
      <div className="userlinks">
        <Link to="/login">LOG IN</Link> <b> | </b>
        <Link to="/cart">
          CART <i className="fas fa-shopping-cart"></i>
          {cartItems.length > 0 && (
            <span className="badge">{cartItems.length}</span>
          )}
        </Link>
      </div>
    </header>
  );
}
