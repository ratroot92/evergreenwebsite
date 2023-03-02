/* eslint-disable */
import React from 'react';
import { Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories } from '../../../redux/actions/category-actions';

export default function AllProducts() {
  const dispatch = useDispatch();
  const allCategories = useSelector((state) => state.categories.allCategories);
  React.useEffect(() => {
    dispatch(getAllCategories({}));
  }, []);
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
      editable: true,
    },

    {
      field: 'password',
      headerName: 'Password',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) => `${params.row.name || ''} ${params.row.category?.name || ''}`,
    },
  ];

  return (
    <>
      {allCategories?.length > 0 ? (
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
                Categories
              </Typography>
              <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 0.3 }}>
                Number of Categories: {allCategories?.length}
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
                Categories:
              </Typography>
              <DataGrid
                rows={allCategories}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
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
