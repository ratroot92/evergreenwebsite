import React from 'react';
import SideTab from './SideTab';

export default function AdminSidebar() {
  return (
    <ul>
      <SideTab label="Dashboard" />
      <SideTab label="Categories" />
      <SideTab label="User" routes={[{ label: 'All User' }, { label: 'Create User' }]} />
      <SideTab label="Role" routes={[{ label: 'All Role' }, { label: 'Create Role' }]} />
      <SideTab label="Category" routes={[{ label: 'All Category' }, { label: 'Create Category' }]} />
      <SideTab label="Product" routes={[{ label: 'All Product' }, { label: 'Create Product' }]} />
    </ul>
  );
}
