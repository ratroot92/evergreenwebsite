import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiServer from "../../config/apiServer";

const initialState = {
  selectedProduct: null,
  products: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};
/**
 *
 */
export const createProduct = createAsyncThunk(
  `/product/create`,
  async (payload, thunkAPI) => {
    try {
      const { status, data } = await apiServer.post(`/product`, payload);
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
export const getProducts = createAsyncThunk(
  `/product/all`,
  async (products, thunkAPI) => {
    try {
      const { status, data } = await apiServer.get(`/product`);
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

export const getProductById = createAsyncThunk(
  `/product/byId`,
  async (payload, thunkAPI) => {
    try {
      const { status, data } = await apiServer.get(`/product?_id=${payload}`);
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

export const updateProductDetails = createAsyncThunk(
  `/product/update/details`,
  async (payload, thunkAPI) => {
    try {
      const { status, data } = await apiServer.patch(`/product`, payload);
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

export const uploadProductAvatar = createAsyncThunk(
  `/product/avatar`,
  async (payload, thunkAPI) => {
    try {
      const { status, data } = await apiServer.post(
        `/product/avatar`,
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

export const uploadProductMedia = createAsyncThunk(
  `/product/media`,
  async (payload, thunkAPI) => {
    try {
      const { status, data } = await apiServer.post(`/product/media`, payload, {
        headers: {
          "Content-Type": "multipart/formdata",
        },
      });
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

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    resetProducts: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
      state.products = [];
    },
    resetSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    /**
     *
     */
    builder.addCase(createProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.products = [...state.products, action.payload.dataReturned];
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.payload;
      state.products = [];
    });

    /**
     *
     */
    builder.addCase(getProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.products = action.payload.dataReturned;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.payload;
      state.products = [];
    });

    /**
     *
     */
    builder.addCase(uploadProductAvatar.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(uploadProductAvatar.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.selectedProduct = action.payload.dataReturned;
      state.products = [
        ...state.products.map((product) => {
          if (product._id === action.payload.dataReturned._id)
            return action.payload.dataReturned;
          else return product;
        }),
      ];
    });
    builder.addCase(uploadProductAvatar.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.payload;
      state.products = [];
    });
    /**
     *
     */
    builder.addCase(getProductById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProductById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.selectedProduct = action.payload.dataReturned;
    });
    builder.addCase(getProductById.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.payload;
      state.selectedProduct = [];
    });

    /**
     *
     */
    builder.addCase(updateProductDetails.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateProductDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.selectedProduct = action.payload.dataReturned;
      state.products = [
        ...state.products.map((product) => {
          if (product._id === action.payload.dataReturned._id)
            return action.payload.dataReturned;
          else return product;
        }),
      ];
    });
    builder.addCase(updateProductDetails.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.payload;
      state.products = [];
    });
  },
});
export const { resetProducts, resetSelectedProduct } = productSlice.actions;
export default productSlice.reducer;
