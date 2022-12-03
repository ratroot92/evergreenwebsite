import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import handleAction from '../../redux/actions';

export default function UserNavbar() {
  const dispatch = useDispatch();
  async function logoutHandler() {
    dispatch(handleAction({ url: '/auth/logout', type: 'SET_LOGOUT', reqType: 'get' }));
  }
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <nav className="navbar navbar-expand-lg navbar-success bg-success">
      <div className="container-fluid">
        <Link className="text-white p-2 " to="/">
          Evergreen
        </Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <Link className="text-white p-2" to="/dashboard">
              Dashboard
            </Link>
            {isAuthenticated ? (
              <button className="btn btn-primary " type="button" onClick={logoutHandler}>
                {user?.username}
              </button>
            ) : (
              <button className="btn btn-primary " type="button" onClick={logoutHandler}>
                {user?.username}
              </button>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
