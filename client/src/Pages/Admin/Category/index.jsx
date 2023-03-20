import React from 'react';
import AddCategory from './AddCategory/AddCategoryPage';
import ListCategoryPage from './ListCategory/ListCategoryPage';

export default function index() {
  return (
    <div>
      <AddCategory />
      <ListCategoryPage />
    </div>
  );
}
