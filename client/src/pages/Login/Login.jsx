import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";

export default function Login() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    //TODO: login action
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <h1>ACCOUNT LOGIN</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="center">
            LOGIN
          </button>
          <span>
            New to LMAU? &nbsp; <Link to="/register">Register</Link>
          </span>
        </form>
      </div>
    </div>
  );
}
