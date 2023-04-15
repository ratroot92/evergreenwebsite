/* eslint-disable  */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiServer from '../../../config/axios.config';

const initialState = {
  stats: null,
  isError: false,
  isSuccess: false,
  isLoading: true,
  message: '',
};

export const getDashboardStats = createAsyncThunk('dashboard', async (payload, thunkAPI) => {
  try {
    const response = await apiServer.get('/dashboard');
    if (response.status === 200) {
      return response.data.data;
    }
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    reset: (state) => {
      state.stats = null;
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = true;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDashboardStats.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getDashboardStats.fulfilled, (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.isSuccess = true;
      state.stats = action.payload;
    });
    builder.addCase(getDashboardStats.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload.data;
      state.stats = null;
    });
  },
});
export const { reset } = adminSlice.actions;
export default adminSlice.reducer;
