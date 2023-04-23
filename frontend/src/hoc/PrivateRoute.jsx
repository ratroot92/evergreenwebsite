/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoute({ element: Component, ...rest }) {
  const { user } = useSelector((state) => state.auth);
  if (user) {
    return <Outlet />;
  }
  return <Navigate to="/login" />;
}
