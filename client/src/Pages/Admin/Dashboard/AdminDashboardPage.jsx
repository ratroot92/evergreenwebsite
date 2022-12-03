import React from 'react';
import { useDispatch } from 'react-redux';
import AdminSidebar from '../../../components/Admin/Sidebar/AdminSidebar';
import { adminLogout } from '../../../redux/actions/auth-actions';

export default function AdminDashboardPage() {
  const dispatch = useDispatch();
  return (
    <div className="row">
      <div className="col-md-2">
        <AdminSidebar />
      </div>
      <div>
        <button type="button" className="btn btn-sm" onClick={() => dispatch(adminLogout())}>
          Logout
        </button>
      </div>
    </div>
  );
}
