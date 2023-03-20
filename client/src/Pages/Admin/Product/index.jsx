import React from 'react';
import AddProduct from './AddProduct/AddProductPage';
import ListProductsPage from './ListProducts/ListProductsPage';

export default function index() {
  return (
    <div>
      <AddProduct />
      <ListProductsPage />
    </div>
  );
}
