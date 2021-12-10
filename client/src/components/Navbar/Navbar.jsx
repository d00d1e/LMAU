import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  return (
    <nav>
      <ul className="navlinks">
        <li>
          <Link to="product.html">Sweaters</Link>
        </li>
        <li>
          <Link to="product.html">Tshirts</Link>
        </li>
        <li>
          <Link to="product.html">Loungewear</Link>
        </li>
        <li>
          <Link to="product.html">Accessories</Link>
        </li>
      </ul>
    </nav>
  );
}
