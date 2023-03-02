import React from 'react';
import { Typography } from '@mui/material';

import { useSelector } from 'react-redux';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Chart from '../DashboardItems/Chart';
import Deposits from '../DashboardItems/Deposits';
import Orders from '../DashboardItems/Orders';

export default function DashMain() {
  const { user } = useSelector((state) => state.auth);
  return (
    <Grid container spacing={3}>
      {/* Chart */}
      <Grid item xs={12} md={8} lg={9}>
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
      </Grid>
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
            Welcome {user.username}!
          </Typography>
          <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 0.3 }}>
            Role: {user.role.name}
          </Typography>
          <Deposits />
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
