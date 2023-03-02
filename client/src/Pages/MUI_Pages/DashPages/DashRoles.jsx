/* eslint-disable */
import React from 'react';
import { Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRoles } from '../../../redux/actions/user-actions';

function DashRoles() {
  const dispatch = useDispatch();
  const allRoles = useSelector((state) => state.users.allRoles);
  React.useEffect(() => {
    if (allRoles.length === 0) {
      dispatch(getAllRoles());
    }
  }, []);
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
      editable: true,
    },
  ];

  return (
    <>
      {allRoles?.length > 0 ? (
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
                Roles
              </Typography>
              <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 0.3 }}>
                Number of Orders: {allRoles?.length}
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
                Roles:
              </Typography>
              <DataGrid
                rows={allRoles}
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

export default DashRoles;
