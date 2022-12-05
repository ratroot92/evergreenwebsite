import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// React Hook Form + Yup Validation
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
// import { useSelector, useDispatch } from 'react-redux';
import { useDispatch } from 'react-redux';
import './MuiAdminLogin.css';
// import handleAction from '../../redux/actions';
import { adminLogin } from '../../redux/actions/auth-actions';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      {/* <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link> */}
      {new Date().getFullYear()}
    </Typography>
  );
}
/* eslint-disable react/jsx-props-no-spreading */
function MuiAdminLogin() {
  const theme = createTheme();

  const dispatch = useDispatch();
  // const { isAuthenticated } = useSelector((state) => state.auth);

  const useYupValidationResolver = (validationSchema) =>
    React.useCallback(
      async (data) => {
        try {
          const values = await validationSchema.validate(data, {
            abortEarly: false,
          });

          return {
            values,
            errors: {},
          };
        } catch (errors) {
          return {
            values: {},
            errors: errors.inner.reduce(
              (allErrors, currentError) => ({
                ...allErrors,
                [currentError.path]: {
                  type: currentError.type ?? 'validation',
                  message: currentError.message,
                },
              }),
              {}
            ),
          };
        }
      },
      [validationSchema]
    );

  const validationSchema = yup.object({
    username: yup.string().email('Invalid email').required('Required'),
    password: yup.string().min(8, 'Not allowed').max(25, 'Not allowed').required('Required'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: useYupValidationResolver(validationSchema),
    defaultValues: {
      username: 'alice@evergreen.com',
      password: 'pakistan',
    },
  });

  const onSubmit = async (data) => {
    try {
      const { username, password } = data;
      const requestPayload = {
        type: 'email',
        payload: username,
        password,
      };
      dispatch(adminLogin(requestPayload));
    } catch (err) {
      toast(err.message);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.8
          }}
        >
          <Typography component="h1" variant="h2" className='picText'>
            Welcome to evergreen
          </Typography>
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Admin Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                {...register('username')}
              />

              {errors?.username ? (
                <small className="c-input-error-invalid">{errors.username.message}</small>
              ) : (
                <small className="c-input-error-valid">valid!</small>
              )}

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                {...register('password')}
              />

              {errors?.password ? (
                <small className="c-input-error-invalid">{errors.password.message}</small>
              ) : (
                <small className="c-input-error-valid">valid!</small>
              )}

              <div>
                <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
              </div>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  {/* <Link href="#" variant="body2">
                    Forgot password?
                  </Link> */}
                </Grid>
                <Grid item>
                  {/* <Link href="#" variant="body2">
                  </Link> */}
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
export default MuiAdminLogin;
