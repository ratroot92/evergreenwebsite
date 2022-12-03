/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import React from 'react';

export default function ProtectedAdminRoute({ element: Component, ...rest }) {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  if (user && isAuthenticated) {
    return <Outlet />;
  }
  return <Navigate to="/admin/login" />;
}
