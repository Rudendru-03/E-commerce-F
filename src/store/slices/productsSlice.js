import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/products";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (category, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await axiosInstance.get(`/${category}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      return { category, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: {},
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items[action.payload.category] = action.payload.data;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      });
  },
});

export default productsSlice.reducer;
