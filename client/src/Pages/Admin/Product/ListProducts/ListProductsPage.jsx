/* eslint-disable */
import React from 'react';
import { Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../../../redux/actions/product-action';

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
              rows={allProducts || []}
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
    </>
  );
}

export default AllProducts;
