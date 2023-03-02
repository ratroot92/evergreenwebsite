/* eslint-disable */
import React from 'react';
import { Typography } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Chart from '../DashboardItems/Chart';
import Deposits from '../DashboardItems/Deposits';
import Orders from '../DashboardItems/Orders';
import { getAllCategories } from '../../../redux/actions/category-actions';
import { getAllProducts } from '../../../redux/actions/product-action';
import { getAllRoles, getAllUsers } from '../../../redux/actions/user-actions';

export default function DashMain() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllProducts());
    dispatch(getAllUsers());
    dispatch(getAllRoles());
  }, []);
  const { user } = useSelector((state) => state.auth);
  const allProducts = useSelector((state) => state.products.allProducts || []);
  const allCategories = useSelector((state) => state.categories.allCategories || []);
  const allUsers = useSelector((state) => state.users.allUsers || []);
  const allRoles = useSelector((state) => state.users.allRoles || []);

  return (
    <Grid container spacing={3}>
      {/* Chart */}
      {/* <Grid item xs={12} md={8} lg={9}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
          }}
        >
          <Chart />
        </Paper>
      </Grid> */}
      {/* Recent Deposits */}
      <Grid item xs={12} md={4} lg={3}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
          }}
        >
          <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 0.3 }}>
            Products {allProducts?.length}
          </Typography>
          <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 0.3 }}>
            Role: {user.role.name}
          </Typography>
          <Deposits lastInserted={allProducts[0]?.createdAt || ''} href="products" title={'Products'} count={allProducts?.length} />
        </Paper>
      </Grid>

      <Grid item xs={12} md={4} lg={3}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
          }}
        >
          <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 0.3 }}>
            Categories {allCategories?.length}
          </Typography>
          <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 0.3 }}>
            Role: {user.role.name}
          </Typography>
          <Deposits lastInserted={allCategories[0]?.createdAt || ''} href="categories" title={'Categories'} count={allCategories?.length} />
        </Paper>
      </Grid>

      <Grid item xs={12} md={4} lg={3}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
          }}
        >
          <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 0.3 }}>
            Users {allUsers?.length}
          </Typography>
          <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 0.3 }}>
            Role: {user.role.name}
          </Typography>
          <Deposits lastInserted={allUsers[0]?.createdAt || ''} href="users" title={'Users'} count={allUsers?.length} />
        </Paper>
      </Grid>

      <Grid item xs={12} md={4} lg={3}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
          }}
        >
          <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 0.3 }}>
            Roles {allRoles?.length}
          </Typography>
          <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 0.3 }}>
            Role: {user.role.name}
          </Typography>
          <Deposits lastInserted={allRoles[0]?.createdAt || ''} href="roles" title={'Roles'} count={allRoles?.length} />
        </Paper>
      </Grid>
      {/* Recent Orders */}
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <Orders />
        </Paper>
      </Grid>
    </Grid>
  );
}
