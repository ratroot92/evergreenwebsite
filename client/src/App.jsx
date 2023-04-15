/* eslint-disable  */
import React from 'react';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import { isAuthenticated, reset } from './redux/features/auth/authSlice';
import Spinner from './components/Spinner';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import ProtectedRoute from './hoc/ProtectedRoute';
import UnprotectedRoute from './hoc/UnprotectedRoute';
export default function App() {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.auth);
  React.useEffect(() => {
    if (!user) {
      dispatch(isAuthenticated());
    }
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<AdminDashboard />} />
        </Route>
        <Route element={<UnprotectedRoute />}>
          <Route path="/login" element={<AdminLogin />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

const PageNotFound = () => {
  return (
    <div>
      <p className="text-white">PageNotFound</p>
    </div>
  );
};
