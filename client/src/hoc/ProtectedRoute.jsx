/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

export default function ProtectedRoute({ element: Component, ...rest }) {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  if (!user || !isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
}
