/* eslint-disable */
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
function UnprotectedRoute({ element: Component, ...rest }) {
  const { user } = useSelector((state) => state.auth);
  if (!user) {
    return <Outlet />;
  }
  return <Navigate to="/" />;
}

export default UnprotectedRoute;
