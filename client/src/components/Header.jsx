import React from "react";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser, resetAuth } from "../features/auth/authSlice";
function Header(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  // React.useEffect(()=>{
  //   if(!user){}
  // },[user,navigate])

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">EverGreen</Link>
      </div>
      <ul>
        <li>
          <Link to="/register">
            <FaUser />
            Register
          </Link>
        </li>
        {user ? (
          <li>
            <button
              type="button"
              onClick={() => {
                dispatch(logoutUser());
                dispatch(resetAuth());
                navigate("/");
              }}
              className="btn btn-sm"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </li>
        ) : (
          <li>
            <Link to="/login">
              <FaSignInAlt />
              Login
            </Link>
          </li>
        )}
      </ul>
    </header>
  );
}

export default Header;
