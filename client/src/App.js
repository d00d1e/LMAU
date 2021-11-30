import React from "react";
import Product from "./components/Product/Product";
import data from "./data";

export default function App() {
  return (
    <div>
      <div className="grid-container">
        <div className="announcement">
          It's the BIGGEST SALE of the year! Save up to 65% now.
        </div>

        <header>
          <div className="row dashboard">
            <div>
              <a className="brand" href="/">
                LMAU
              </a>
            </div>
            <div className="userlinks">
              <a href="/cart">CART</a>
              <a href="/signin">SIGNIN</a>
            </div>
          </div>

          <nav>
            <ul className="navlinks">
              <li>
                <a href="product.html">SWEATER</a>
              </li>
              <li>
                <a href="product.html">TSHIRTS</a>
              </li>
              <li>
                <a href="product.html">ACCESSORIES</a>
              </li>
            </ul>
          </nav>
        </header>

        <main>
          <div className="slider">
            <img
              src={require("./assets/img/slider1.jpg").default}
              alt="slider1"
            />
          </div>

          <div className="row center">
            {data.products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </main>

        <footer>
          <div className="row center">
            &copy;2021 LMAU, Inc. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
}
