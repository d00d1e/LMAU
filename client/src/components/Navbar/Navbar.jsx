import React from "react";
import "./navbar.css";

export default function Navbar() {
  return (
    <nav>
      <ul className="navlinks">
        <li>
          <a href="product.html">Sweaters</a>
        </li>
        <li>
          <a href="product.html">T-shirts</a>
        </li>
        <li>
          <a href="product.html">Loungewear</a>
        </li>
        <li>
          <a href="product.html">Accessories</a>
        </li>
      </ul>
    </nav>
  );
}
