/* eslint-disable  */
import React from 'react';
import Navbar from './components/Navbar/Navbar';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AdminLogin from './pages/admin/login';
import AdminOtp from './pages/admin/otp';
import { startSetAuthenticated } from './redux/actions/auth-actions';
import ClipLoader from 'react-spinners/ClipLoader';

const override = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red',
};
export default function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch({ type: 'SET_LOADING', payload: true });
    // dispatch(startSetAuthenticated());
    dispatch({ type: 'SET_LOADING', payload: false });
  }, []);

  const { login, otpVerified: otp, loading } = useSelector((state) => state.auth);

  const NavigateAdmin = <Navigate to={'/admin'} />;
  const NavigateAdminLogin = <Navigate to={'/admin/login'} />;
  const NavigateAdminOtp = <Navigate to={'/admin/otp'} />;
  const NavigateAdminDashboard = <Navigate to={'/admin'} />;

  return (
    <>
      {loading ? (
        <ClipLoader color={'#000'} loading={loading} cssOverride={override} size={150} />
      ) : (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={login && otp ? NavigateAdmin : <HomePage />} />
            <Route path="/admin" element={login ? otp ? <DashboardAdmin /> : <Navigate to={'/admin/otp'} /> : <Navigate to={'/admin/login'} />} />
            <Route path="/admin/login" element={login ? otp ? NavigateAdminDashboard : NavigateAdminOtp : <AdminLogin />} />
            <Route path="/admin/otp" element={login ? otp ? NavigateAdminDashboard : <AdminOtp /> : NavigateAdminLogin} />

            <Route path="*" element={<RouteNotFound />} />
          </Routes>
        </>
      )}
    </>
  );
}

const HomePage = () => {
  return (
    <div>
      <p className="text-white">HomePage</p>
    </div>
  );
};

const DashboardAdmin = () => {
  return (
    <div>
      <p className="text-white">DashboardAdmin</p>
      <Outlet />
    </div>
  );
};

const RouteNotFound = () => {
  return (
    <div>
      <p className="text-white">RouteNotFound</p>
    </div>
  );
};
