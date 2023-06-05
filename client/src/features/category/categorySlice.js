import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiServer from "../../config/apiServer";

const initialState = {
  selectedCategory: null,
  categories: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};
/**
 *
 */
export const createCategory = createAsyncThunk(
  `/category/create`,
  async (payload, thunkAPI) => {
    try {
      const { status, data } = await apiServer.post(`/category`, payload);
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
export const getCategories = createAsyncThunk(
  `/category/all`,
  async (categories, thunkAPI) => {
    try {
      const { status, data } = await apiServer.get(`/category`);
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

export const getCategoryById = createAsyncThunk(
  `/category/byId`,
  async (payload, thunkAPI) => {
    try {
      const { status, data } = await apiServer.get(`/category?_id=${payload}`);
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

export const updateCategoryDetails = createAsyncThunk(
  `/category/update/details`,
  async (payload, thunkAPI) => {
    try {
      const { status, data } = await apiServer.patch(`/category`, payload);
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

export const uploadCategoryAvatar = createAsyncThunk(
  `/category/avatar`,
  async (payload, thunkAPI) => {
    try {
      const { status, data } = await apiServer.post(
        `/category/avatar`,
        payload,
        {
          headers: {
            "Content-Type": "multipart/formdata",
          },
        }
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

export const uploadCategoryMedia = createAsyncThunk(
  `/category/media`,
  async (payload, thunkAPI) => {
    try {
      const { status, data } = await apiServer.post(
        `/category/media`,
        payload,
        {
          headers: {
            "Content-Type": "multipart/formdata",
          },
        }
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

export const removeCategoryMedia = createAsyncThunk(
  `/category/media`,
  async (payload, thunkAPI) => {
    try {
      const { status, data } = await apiServer.delete(
        `/category/media?_id=${payload._id}&publicId=${payload.publicId}`
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

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    resetCategories: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
      state.categories = [];
      state.selectedCategory = null;
    },
    resetSelectedCategory: (state) => {
      state.selectedCategory = null;
    },
  },
  extraReducers: (builder) => {
    /**
     *
     */
    builder.addCase(createCategory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.categories = [...state.categories, action.payload.dataReturned];
    });
    builder.addCase(createCategory.rejected, (state, action) => {
      console.log(" action.payload.dataReturned", action);
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      //   state.message = action.payload.dataReturned;
      state.message = action.payload;
      state.categories = [];
    });

    /**
     *
     */
    builder.addCase(getCategories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.categories = action.payload.dataReturned;
    });
    builder.addCase(getCategories.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      //   state.message = action.payload.dataReturned;
      state.message = action.payload;
      state.categories = [];
    });
    /**
     *
     */
    builder.addCase(uploadCategoryAvatar.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(uploadCategoryAvatar.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.selectedCategory = action.payload.dataReturned;
      state.categories = [
        ...state.categories.map((category) => {
          if (category._id === action.payload.dataReturned._id)
            return action.payload.dataReturned;
          else return category;
        }),
      ];
    });
    builder.addCase(uploadCategoryAvatar.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      //   state.message = action.payload.dataReturned;
      state.message = action.payload;
      state.categories = [];
    });

    /**
     *
     */
    builder.addCase(uploadCategoryMedia.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(uploadCategoryMedia.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.selectedCategory = action.payload.dataReturned;
      state.categories = [
        ...state.categories.map((category) => {
          if (category._id === action.payload.dataReturned._id)
            return action.payload.dataReturned;
          else return category;
        }),
      ];
    });
    builder.addCase(uploadCategoryMedia.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      //   state.message = action.payload.dataReturned;
      state.message = action.payload;
      state.categories = [];
    });
    /**
     *
     */
    builder.addCase(getCategoryById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCategoryById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.selectedCategory = action.payload.dataReturned;
    });
    builder.addCase(getCategoryById.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      //   state.message = action.payload.dataReturned;
      state.message = action.payload;
      state.selectedCategory = [];
    });

    /**
     *
     */
    builder.addCase(updateCategoryDetails.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateCategoryDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.selectedCategory = action.payload.dataReturned;
      state.categories = [
        ...state.categories.map((category) => {
          if (category._id === action.payload.dataReturned._id)
            return action.payload.dataReturned;
          else return category;
        }),
      ];
    });
    builder.addCase(updateCategoryDetails.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      //   state.message = action.payload.dataReturned;
      state.message = action.payload;
      state.categories = [];
    });
  },
});
export const { resetCategories, resetSelectedCategory } = categorySlice.actions;
export default categorySlice.reducer;
