/* eslint-disable  */
import React from 'react';
import { Link } from 'react-router-dom';
export default function MarketPage(props) {
  React.useEffect(() => {}, []);

  return (
    <div>
      <div className="bg-white p-2">
        <Link className="text-decoration-none text-dark" to={'/'}>
          <b> Evergreen</b>
        </Link>
        <button className="btn btn-sm btn-success m-1 ">
          <Link className="text-decoration-none text-white" to={'/user/login'}>
            <b>User</b>
          </Link>
        </button>
        <button className="btn btn-sm btn-warning m-1 ">
          <Link className="text-decoration-none text-dark" to={'/admin/login'}>
            <b>Admin</b>
          </Link>
        </button>
      </div>
    </div>
  );
}
