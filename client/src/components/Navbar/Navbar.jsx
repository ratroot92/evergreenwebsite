/* eslint-disable */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaBrain, FaLock } from 'react-icons/fa';
import { logout, reset } from '../../redux/features/auth/authSlice';
import './Navbar.css';
export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="conatiner-fluid">
      <div className="row bg-success">
        <div className="col-md-2 ">
          <div className="row">
            <div className="col-md-2 d-flex flex-row justify-content-center align-items-center">
              <FaBrain size={30} color={'white'} />
            </div>
            <div className="col-md-9 d-flex flex-row justify-content-start align-items-center">
              <h3 className="navbar-title"> Evergreen</h3>
            </div>
          </div>
        </div>

        <div className="col-md-8 "></div>
        <div className="col-md-2 ">
          <div className="row h-100">
            <div className="col-md-6  "></div>
            <div className="col-md-5  d-flex flex-row justify-content-end align-items-center ">
              {user ? (
                <button
                  onClick={() => {
                    dispatch(logout());
                  }}
                  className="btn btn-sm btn-danger flat-border"
                >
                  <FaLock /> Logout
                </button>
              ) : (
                <button onClick={() => navigate('/login')} className="btn btn-sm btn-warning flat-border">
                  <FaLock /> Login
                </button>
              )}
            </div>
            <div className="col-md-1   "></div>
          </div>
        </div>
      </div>
    </div>
  );
}
