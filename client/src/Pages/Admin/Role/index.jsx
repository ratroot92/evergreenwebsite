import React from 'react';
import AddRole from './AddRole/AddRole';
import ListRoles from './ListRoles/ListRoles';

export default function index() {
  return (
    <div>
      <AddRole />
      <ListRoles />
    </div>
  );
}
