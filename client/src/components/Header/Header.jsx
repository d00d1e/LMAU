import React from "react";
import "./header.css";

export default function Header() {
  return (
    <header className="row">
      <div>
        <a className="brand" href="/">
          LMAU
        </a>
      </div>
      <div className="userlinks">
        <a href="/login">LOG IN</a> <b> | </b>
        <a href="/cart">
          CART <i className="fas fa-shopping-cart"></i>
        </a>
      </div>
    </header>
  );
}
