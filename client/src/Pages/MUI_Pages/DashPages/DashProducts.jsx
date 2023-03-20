/* eslint-disable */
import React from 'react';
import { Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addNewProduct, getAllProducts } from '../../../redux/actions/product-action';
import { getAllCategories } from '../../../redux/actions/category-actions';
import { clearStoreErrors } from '../../../redux/actions/error-actions';

function AddProduct() {
  const dispatch = useDispatch();
  const allCategories = useSelector((state) => state.categories.allCategories);
  const storeErrors = useSelector((state) => state.errors);

  React.useEffect(() => {
    dispatch(getAllCategories());
  }, []);
  React.useEffect(() => {
    console.log('storeErrors', storeErrors);
    if (storeErrors.length) {
      setTimeout(() => {
        dispatch(clearStoreErrors());
      }, 5000);
    }
  }, [storeErrors]);

  const [state, setState] = React.useState({
    name: null,
    catId: null,
  });

  const [error, setError] = React.useState({ name: null, catId: null });

  function submitForm(e) {
    e.preventDefault();
    console.log('state', state);
    if (!state.name) setError({ ...error, name: 'Product name is required !' });
    else if (!state.catId) setError({ ...error, catId: 'Product catId is required !' });
    else {
      console.log('state', state);
      dispatch(addNewProduct(state));
    }
  }

  return (
    <div>
      <div>
        {storeErrors?.map((error, index) => (
          <p key={error + index}>{error}</p>
        ))}
      </div>
      {allCategories?.length > 0 ? (
        <form onSubmit={submitForm}>
          <div className="mt-2 mb-2">
            <label>Name</label>
            <input type="text" name="name" className="form-control" onChange={(e) => setState({ ...state, name: e.target.value })} />
            {error?.name ? <small className="text-danger mt-2">{error.name}</small> : <></>}
          </div>

          <div className="mt-2 mb-2">
            <label>Category</label>
            <select onChange={(e) => setState({ ...state, catId: e.target.value })} className="form-control">
              <option value="">Select Category</option>
              {allCategories?.length &&
                allCategories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
            </select>
            {error?.catId ? <small className="text-danger mt-2">{error.catId}</small> : <></>}
          </div>
          <div className="mt-2 mb-2">
            <input type="submit" className="btn btn-sm btn-success" value="Add Product" />
          </div>
        </form>
      ) : (
        <></>
      )}
    </div>
  );
}

function AllProducts() {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products.allProducts);
  React.useEffect(() => {
    dispatch(getAllProducts({}));
  }, []);
  const columns = [
    { field: '_id', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
      editable: true,
    },
    {
      field: 'category',
      headerName: 'Category',
      width: 150,
      editable: true,
      valueGetter: (params) => `${params.row.category?.name || ''}`,
    },
    {
      field: 'id',
      headerName: 'Detail',
      width: 150,
      editable: true,
      renderCell: (params) => (
        <span>
          <Link to={`/admin/dashboard/products/${params.row._id}`}>View Detail</Link>
        </span>
      ),
    },
  ];

  return (
    <>
      <AddProduct></AddProduct>
      {allProducts?.length > 0 ? (
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 150,
              }}
            >
              <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 0.3 }}>
                Products
              </Typography>
              <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 0.3 }}>
                Number of Products: {allProducts?.length}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 500,
              }}
            >
              <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 0.1 }}>
                Products:
              </Typography>
              <DataGrid
                rows={allProducts}
                columns={columns}
                pageSize={50}
                getRowId={(row) => row?._id}
                rowsPerPageOptions={[50]}
                checkboxSelection
                disableSelectionOnClick
                experimentalFeatures={{ newEditingApi: true }}
              />
            </Paper>
          </Grid>
        </Grid>
      ) : (
        <></>
      )}
    </>
  );
}

export default AllProducts;
