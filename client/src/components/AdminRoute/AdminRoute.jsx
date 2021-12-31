import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

export default function AdminRoute({ children }) {
  const { userInfo } = useSelector((state) => state.userSignin);

  return userInfo && userInfo.isAdmin ? children : <Navigate to="/login" />;
}
