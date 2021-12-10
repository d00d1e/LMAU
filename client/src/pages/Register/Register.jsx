import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/actions/userActions";
import "./register.css";

export default function Login() {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const { userInfo, error } = useSelector((state) => state.userRegister);

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect]);

  const handleRegister = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      // FIXME: remove alert
      alert("Passwords do not match");
    }

    dispatch(register(name, email, password));
    // navigate("/login");
  };

  return (
    <div className="register-container">
      <div className="register-wrapper">
        <h1>CREATE AN ACCOUNT</h1>
        {error && <span className="error register-error"></span>}
        <form className="register-form" onSubmit={handleRegister}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
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
          <label htmlFor="confirmPassword"> Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit" className="center">
            REGISTER
          </button>
          <span>
            Already have an account? &nbsp;
            <Link to={`/login?redirect=${redirect}`}>Login</Link>
          </span>
        </form>
      </div>
    </div>
  );
}
