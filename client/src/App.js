import React from "react";
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
        </header>

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

        <main>
          <div className="slider">
            <img
              src={require("./assets/img/slider1.jpg").default}
              alt="slider1"
            />
          </div>

          <div className="row center">
            {data.products.map((product) => (
              <div key={product._id} className="card">
                <a href={`/products/${product._id}`}>
                  <img
                    className="medium"
                    src={
                      require(`./assets/img/products/${product.image}`).default
                    }
                    alt={product.title}
                  />
                </a>
                <div className="card-body">
                  <a href={`/products/${product._id}`}>
                    <h2>{product.title}</h2>
                  </a>
                  <div className="rating">
                    <span>
                      <i className="fas fa-star"></i>
                    </span>
                    <span>
                      <i className="fas fa-star"></i>
                    </span>
                    <span>
                      <i className="fas fa-star"></i>
                    </span>
                    <span>
                      <i className="fas fa-star"></i>
                    </span>
                    <span>
                      <i className="far fa-star"></i>
                    </span>
                  </div>
                  <div className="price">${product.price}</div>
                </div>
              </div>
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
