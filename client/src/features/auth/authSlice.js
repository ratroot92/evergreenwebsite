import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiServer from "../../config/apiServer";
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};
/**
 *
 */
export const registerUser = createAsyncThunk(
  `/auth/register`,
  async (user, thunkAPI) => {
    try {
      const { status, data } = await apiServer.post(`/auth/register`, user);
      if (status === 200 || status === 201) {
        return data;
      }
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
/**
 *
 */
export const loginUser = createAsyncThunk(
  `/auth/login`,
  async (user, thunkAPI) => {
    try {
      const { status, data } = await apiServer.post(`/auth/login`, user);
      if (status === 200 || status === 201) {
        return data;
      }
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const isUserAuthenticated = createAsyncThunk(
  `/auth/logout`,
  async (user, thunkAPI) => {
    try {
      const { status, data } = await apiServer.get(
        `/auth/is-authenticated`,
        user
      );
      if (status === 200 || status === 201) {
        return data;
      }
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
/**
 *
 */
export const logoutUser = createAsyncThunk(
  `/auth/logout`,
  async (user, thunkAPI) => {
    try {
      const { status, data } = await apiServer.get(`/auth/logout`, user);
      if (status === 200 || status === 201) {
        localStorage.removeItem("accessToken");
        return data;
      }
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuth: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    /**
     *
     */
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload.dataReturned;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.payload.dataReturned;
      state.user = null;
    });

    /**
     *
     */
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload.dataReturned;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.payload.dataReturned;
      state.user = null;
    });

    builder.addCase(isUserAuthenticated.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(isUserAuthenticated.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload.dataReturned;
    });
    builder.addCase(isUserAuthenticated.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.payload.dataReturned;
      state.user = null;
    });
    /**
     *
     */
  },
});
export const { resetAuth } = authSlice.actions;
export default authSlice.reducer;
