/* eslint-disable  */
import React from 'react';
import { useDispatch } from 'react-redux';
import Navbar from '../../../components/Navbar/UserNavbar';
import { Link } from 'react-router-dom';
export default function HomePage() {
  const dispatch = useDispatch();

  return (
    <div className="conatiner-fluid">
      <div className="row">
        <div className="col-md-12">
          <Navbar />
        </div>
        <div className="col-md-2">
          <div className="row">
            <div className="col-md-12 border">
              <li className="border p-2 ">
                <Link to="/"> Home</Link>
              </li>
              <li className="border p-2 ">
                <Link to="/user"> Users</Link>
              </li>
              <li className="border p-2 ">
                <Link to="/product"> Products</Link>
              </li>
              <li className="border p-2 ">
                <Link to="/category"> Categories</Link>
              </li>
            </div>
          </div>
        </div>
        <div className="col-md-10">
          <div className="row">
            <div className="col-md-4 border">1</div>
            <div className="col-md-4 border">1</div>
            <div className="col-md-4 border">1</div>
          </div>
        </div>
      </div>
    </div>
  );
}
