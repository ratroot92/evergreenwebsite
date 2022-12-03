// /* eslint-disable no-unused-vars */
// /* eslint-disable react/prop-types */
// import { useSelector } from 'react-redux';
// import { Navigate, Outlet } from 'react-router-dom';
// import React from 'react';

// export default function OtpRoute({ element: Component, ...rest }) {
//   // console.info('OtpRoute');
//   const { loginPayload, isAuthenticated, isOtpVerified } = useSelector((state) => state.auth);
//   if (isAuthenticated) {
//     return !isOtpVerified ? <Outlet /> : <Navigate to="/dashboard" />;
//   }
//   return <Navigate to="/login" />;
// }
