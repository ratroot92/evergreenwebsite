/* eslint-disable  */
import React from 'react';
import Navbar from './components/Navbar/UserNavbar';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Paper from '@mui/material/Paper';
import { ClipLoader } from 'react-spinners';
import ProtectedRoute from './hoc/ProtectedRoute';
import { startSetAuth } from './redux/actions/auth-actions';
import OtpRoute from './hoc/OtpRoute';
import HomePage from './Pages/User/Home/HomePage';
import handleAction from './redux/actions';
import UserLoginPage from './Pages/User/Login/UserLoginPage';
import UserProfilePage from './Pages/User/Profile/UserProfilePage';
import MarketPage from './Pages/Market/MarketPage';
import UserDashboardPage from './Pages/User/Dashboard/UserDashboardPage';
import AdminLoginPage from './Pages/Admin/Login/AdminLoginPage';
import AdminDashboardPage from './Pages/Admin/Dashboard/AdminDashboardPage';
import AdminProfilePage from './Pages/Admin/Profile/AdminProfilePage';
import ProtectedUserRoute from './hoc/ProtectedUserRoute';
import UnProtectedUserRoute from './hoc/UnProctedUserRoute';
import UnProtectedAdminRoute from './hoc/UnProtectedAdminRoute';
import ProtectedAdminRoute from './hoc/ProtectedAdminRoute';

// MUI Admin Pages
import MuiAdminLogin from './Pages/MUI_Pages/MuiAdminLogin';
import MuiAdminDashboard from './Pages/MUI_Pages/MuiAdminDashboard';
import DashMain from './Pages/MUI_Pages/DashPages/DashMain';
import UserPage from './Pages/Admin/User/index';
import CategoryPage from './Pages/Admin/Category/index';
import CategoryDetailPage from './Pages/Admin/Category/CategortDetail';

import ProductPage from './Pages/Admin/Product/index';
import RolePage from './Pages/Admin/Role/index';

import DashIntegrations from './Pages/MUI_Pages/DashPages/DashIntegrations';
import toast, { Toaster } from 'react-hot-toast';
import { setLoading, setNotifier } from './redux/actions/ui-actions';
import APP_ACTIONS from './redux/constants/actions';
const override = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red',
};

export default function App() {
  const dispatch = useDispatch();
  const { loading, successMessage } = useSelector((state) => state.ui);
  const { isAuthenticated } = useSelector((state) => state.auth);
  let [color, setColor] = React.useState('#ffffff');

  React.useEffect(() => {
    dispatch(handleAction({ url: '/auth/is-authenticated', type: APP_ACTIONS.AUTH_ACTIONS.SET_IS_AUTHENTICATED, reqType: 'get' }));
  }, []);

  React.useEffect(() => {
    if (!isAuthenticated) {
      dispatch(setLoading(false));
    }
  }, [isAuthenticated]);

  React.useEffect(() => {
    if (successMessage) {
      toast(successMessage);
      dispatch(setNotifier(''));
    }
  }, [successMessage]);
  return (
    <>
      {loading ? (
        <div className="row">
          <div className="col-md-12">
            <div className="g-center-r">
              <ClipLoader color={color} loading={loading} cssOverride={override} size={600} />
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* <Paper style={{ height: '100vh' }}> */}
          {/* <Navbar /> */}
          <Routes>
            {/* <Route element={<ProtectedRoute />}> */}
            {/* <Route path="/test-login" element={<MuiAdminLogin />} />
            <Route path="/test-dashboard" element={<MuiAdminDashboard />} /> */}
            <Route path="/" element={<MarketPage />} />
            {/* </Route> */}
            {/* User Routes Start */}
            <Route element={<UnProtectedUserRoute />}>
              <Route path="/user/login" element={<UserLoginPage />} />
            </Route>

            <Route element={<ProtectedUserRoute />}>
              <Route path="/user/dashboard" element={<UserDashboardPage />} />
            </Route>
            <Route element={<ProtectedUserRoute />}>
              <Route path="/user/profile" element={<UserProfilePage />} />
            </Route>
            {/* User Routes End */}

            {/* Admin Routes Start */}
            <Route element={<UnProtectedAdminRoute />}>
              {/* <Route path="/admin/login" element={<AdminLoginPage />} /> */}
              <Route path="/admin/login" element={<MuiAdminLogin />} />
            </Route>
            <Route element={<ProtectedAdminRoute />}>
              {/* <Route path="/admin/dashboard" element={<AdminDashboardPage />} /> */}
              <Route path="/admin/dashboard" element={<MuiAdminDashboard children={<DashMain />} />} exact />
              <Route path="/admin/dashboard/main" element={<MuiAdminDashboard children={<DashMain />} />} exact />
              <Route path="/admin/dashboard/users" element={<MuiAdminDashboard children={<UserPage />} />} exact />
              <Route path="/admin/dashboard/roles" element={<MuiAdminDashboard children={<RolePage />} />} exact />
              <Route path="/admin/dashboard/category" element={<MuiAdminDashboard children={<CategoryPage />} />} exact></Route>
              <Route path="/admin/dashboard/category/detail/:id" element={<MuiAdminDashboard children={<CategoryDetailPage />} />} />
              <Route path="/admin/dashboard/products" element={<MuiAdminDashboard children={<ProductPage />} />} exact />
              <Route path="/admin/dashboard/integrations" element={<MuiAdminDashboard children={<DashIntegrations />} />} exact />
              {/* <Route path="/admin/dashboard" element={<MuiAdminDashboard />} /> */}
            </Route>
            <Route element={<ProtectedAdminRoute />}>
              <Route path="/admin/profile" element={<AdminProfilePage />} />
            </Route>

            {/* Admin Routes Start */}

            {/* <Route element={<ProtectedRoute />}>
              <Route path="/user" element={<UserLoginPage />} />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route path="/category" element={<CategoryPage />} />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route path="/product" element={<ProductPage />} />
            </Route> */}

            <Route path="*" element={<RouteNotFound />} />
          </Routes>
          {/* </Paper> */}
        </>
      )}
      <Toaster />
    </>
  );
}

const RouteNotFound = () => {
  return (
    <div>
      <p className="text-white">RouteNotFound</p>
    </div>
  );
};
