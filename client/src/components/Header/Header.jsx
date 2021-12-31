import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { signout } from "../../redux/actions/userActions";
import "./header.css";

export default function Header() {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.userSignin);
  const dispatch = useDispatch();

  const handleSignout = () => {
    dispatch(signout());
    window.location.reload();
  };

  return (
    <header className="row">
      <div>
        <Link className="brand" to="/">
          LMAU
        </Link>
      </div>
      <div className="userlinks">
        {userInfo ? (
          <span className="dropdown">
            <Link to="#">
              {userInfo.name} <i className="fas fa-caret-down"></i>
            </Link>
            <div className="dropdown-content">
              {userInfo.isAdmin ? (
                <>
                  <Link to="/dashboard">Dashboard</Link>
                  <Link to="/orderlist">Order History</Link>
                  <Link to="/productlist">Products</Link>
                </>
              ) : (
                <>
                  <Link to="/profile">Profile</Link>
                  <Link to="/order/history">Orders</Link>
                </>
              )}
            </div>
          </span>
        ) : (
          <Link to="/login">LOG IN</Link>
        )}
        <b> | </b>
        <Link to="/cart">
          CART <i className="fas fa-shopping-cart"></i>
          {cartItems.length > 0 && (
            <span className="badge">{cartItems.length}</span>
          )}
        </Link>
        {userInfo && (
          <>
            <b> | </b>
            <Link to="/" onClick={handleSignout}>
              Log out
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
