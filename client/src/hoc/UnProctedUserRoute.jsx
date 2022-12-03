/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import React from 'react';

export default function UnProtectedUserRoute({ element: Component, ...rest }) {
  // const { isAuthenticated, user } = useSelector((state) => state.auth);
  // console.log('UnProtectedUserRoute[if]', isAuthenticated, user);
  const isAuthenticated = false;
  console.log('UnProtectedUserRoute', isAuthenticated);
  if (!isAuthenticated) {
    return <Outlet />;
  }

  return <Navigate to="/user/dashboard" />;
}