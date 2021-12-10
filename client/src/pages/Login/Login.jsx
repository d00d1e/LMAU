import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../../redux/actions/userActions";
import "./login.css";

export default function Login() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const { userInfo, error } = useSelector((state) => state.userSignin);

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect]);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <h1>ACCOUNT LOGIN</h1>
        {error && (
          <span className="error login-error">Invalid email or password!</span>
        )}
        <form className="login-form" onSubmit={handleLogin}>
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
            New to LMAU? &nbsp;
            <Link to={`/register?redirect=${redirect}`}>Register</Link>
          </span>
        </form>
      </div>
    </div>
  );
}
