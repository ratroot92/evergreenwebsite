import React from 'react';
import { Typography } from '@mui/material';

// import { useSelector } from 'react-redux';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
// import Chart from '../DashboardItems/Chart';
// import Deposits from '../DashboardItems/Deposits';
// import Orders from '../DashboardItems/Orders';

export default function DashIntegrations() {
  return (
    <Grid container spacing={3}>
      {/* Recent Deposits */}
      <Grid item xs={12} md={12} lg={12}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
          }}
        >
          <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 0.3 }}>
            Dash Integrations
          </Typography>
          <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 0.3 }}>
            Stripe
          </Typography>
          <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 0.3 }}>
            Paypal
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}
