import React from 'react';
import AddUser from './AddUser/AddUser';
import ListUsers from './ListUsers/ListUsers';

export default function index() {
  return (
    <div>
      <AddUser />
      <ListUsers />
    </div>
  );
}
