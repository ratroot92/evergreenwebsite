/* eslint-disable  */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiServer from '../../../config/axios.config';

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: true,
  message: '',
};

export const login = createAsyncThunk('auth/login', async (payload, thunkAPI) => {
  try {
    const response = await apiServer.post('/auth/login', payload);
    if (response.status === 200) {
      return response.data.data;
    }
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const isAuthenticated = createAsyncThunk('auth/is-authenticated', async (payload, thunkAPI) => {
  try {
    const response = await apiServer.get('/auth/is-authenticated');
    if (response.status === 200) {
      return response.data.data;
    }
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk('auth/logout', async (payload, thunkAPI) => {
  try {
    const response = await apiServer.get('/auth/logout');
    if (response.status === 200) {
      return response.data.data;
    }
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.user = null;
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = true;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload.user;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload.data;
      state.user = null;
    });
    builder.addCase(isAuthenticated.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(isAuthenticated.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload.user;
    });
    builder.addCase(isAuthenticated.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload.data;
      state.user = null;
    });
    builder.addCase(logout.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload.user;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload.data;
      state.user = null;
    });
  },
});
export const { reset } = authSlice.actions;
export default authSlice.reducer;
