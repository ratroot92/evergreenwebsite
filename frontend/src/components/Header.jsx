import React from "react";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
function Header(props) {
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
        <li>
          <Link to="/login">
            <FaSignInAlt />
            Login
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
