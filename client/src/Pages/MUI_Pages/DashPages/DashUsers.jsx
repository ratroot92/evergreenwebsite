/* eslint-disable */
import React from 'react';
import { Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../../redux/actions/user-actions';

export default function DashUsers() {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.users.allUsers);
  React.useEffect(() => {
    if (allUsers.length === 0) {
      dispatch(getAllUsers());
    }
  }, []);
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'email',
      headerName: 'Email',
      width: 150,
      editable: true,
    },
    {
      field: 'username',
      headerName: 'User name',
      width: 150,
      editable: true,
    },
    {
      field: 'role',
      headerName: 'Role',
      type: 'number',
      width: 110,
      editable: true,
      valueGetter: (params) => `${params.row.role.name || params.row.role}`,
    },
    {
      field: 'password',
      headerName: 'Password',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) => `${params.row.email || ''} ${params.row.username || ''}`,
    },
  ];

  return (
    <>
      {allUsers?.length > 0 ? (
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
                Users
              </Typography>
              <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 0.3 }}>
                Number of Orders: {allUsers?.length}
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
                Users:
              </Typography>
              <DataGrid
                rows={allUsers}
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
