/* eslint-disable  */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getDashboardStats } from '../redux/features/admin/adminSlice';
import Spinner from '../components/Spinner';
import './AdminDashboard.css';
import { FaAirbnb, FaCalculator, FaRocket, FaUser } from 'react-icons/fa';
function AdminDashboard() {
  const { stats, isLoading } = useSelector((state) => state.admin);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (isLoading) {
      dispatch(getDashboardStats());
    }
  }, [dispatch, isLoading]);

  if (isLoading) {
    return <Spinner />;
  }

  const StatsCard = (props) => {
    return (
      <div className="row">
        <div className="col-md-1"></div>
        <div className="col-md-10 card-grid ">
          <div className="row">
            <div className="col-md-12 card-grid-header">
              <h3 className="text-white"> {props.title}</h3>
            </div>
            <div className="col-md-12 card-grid-body">{props.icon()}</div>
            <div className="col-md-12 center">
              <p className="card-count">{props.enitity.count}</p>
            </div>
          </div>
        </div>
        <div className="col-md-1"></div>
      </div>
    );
  };

  return (
    <div className="conatiner-fluid">
      <div className="row">
        <div className="col-md-2">
          <div className="row">
            <div className="col-md-12 sidebar-wrapper">
              <ul>
                <li>
                  <Link to="/">Dashboard</Link>
                </li>
                <li>
                  <Link to="/users">Products</Link>
                </li>
                <li>
                  <Link to="/roles">Roles</Link>
                </li>{' '}
                <li>
                  <Link to="/products">Products</Link>
                </li>
                <li>
                  <Link to="/categories">Products</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-10">
          <div className="row">
            <div className="col-md-3 mt-2 mb-2 ">
              <StatsCard title={'Products'} icon={() => <FaCalculator size={75} color={'white'} />} enitity={stats?.products} />
            </div>
            <div className="col-md-3 mt-2 mb-2">
              <StatsCard title={'Categories'} icon={() => <FaAirbnb size={75} color={'white'} />} enitity={stats?.categories} />
            </div>
            <div className="col-md-3 mt-2 mb-2">
              <StatsCard title={'Roles'} icon={() => <FaRocket size={75} color={'white'} />} enitity={stats?.roles} />
            </div>
            <div className="col-md-3 mt-2 mb-2">
              <StatsCard title={'Users'} icon={() => <FaUser size={75} color={'white'} />} enitity={stats?.users} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
