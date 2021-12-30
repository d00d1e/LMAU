import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

export default function PrivateRoute({ children }) {
  const { userInfo } = useSelector((state) => state.userSignin);

  return userInfo ? children : <Navigate to="/login" />;
}
