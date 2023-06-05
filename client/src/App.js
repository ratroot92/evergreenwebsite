import React from "react";
// import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
// import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { isUserAuthenticated } from "./features/auth/authSlice";
import Spinner from "./components/Spinner";
import PrivateRoute from "./hoc/PrivateRoute";
import PublicRoute from "./hoc/PublicRoute";
import EditProduct from "./pages/Product/EditProduct";
import EditCategory from "./pages/Category/EditCategory";

function App() {
  const { user, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!user) {
      dispatch(isUserAuthenticated());
    }
  }, [user, dispatch]);

  if (!user || isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/register" element={<Register />}></Route>
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Dashboard />}></Route>
              {/* <Route path="/product/:_id" element={<EditProduct />}></Route> */}
              <Route path="/category/:_id" element={<EditCategory />}></Route>
            </Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
