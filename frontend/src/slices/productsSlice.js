import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url, setHeaders } from "./api";
import { toast } from "react-toastify";

const initialState = {
  items: [],
  status: null,
  createStatus: null,
  editStatus: null,
  deleteStatus: null,
};

export const productsFetch = createAsyncThunk(
  "products/productsFetch",
  async () => {
    try {
      const response = await axios.get(`${url}/products`);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const productsCreate = createAsyncThunk(
  "products/productsCreate",
  async (values) => {
    try {
      const response = await axios.post(
        `${url}/products`,
        values,
        setHeaders()
      );

      return response.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data, {
        position: "bottom-left",
      });
    }
  }
);

export const productsEdit = createAsyncThunk(
  "products/productsEdit",
  async (values) => {
    try {
      const response = await axios.put(
        `${url}/products/${values.product._id}`,
        values,
        setHeaders()
      );

      return response.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data, {
        position: "bottom-left",
      });
    }
  }
);

export const productDelete = createAsyncThunk(
  "products/productDelete",
  async (id) => {
    try {
      const response = await axios.delete(
        `${url}/products/${id}`,
        setHeaders()
      );

      return response.data;
    } catch (error) {
      console.log(error.response.data);
      toast.error(error.response?.data, {
        position: "bottom-left",
      });
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(productsFetch.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(productsFetch.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'success';
      })
      .addCase(productsFetch.rejected, (state, action) => {
        state.status = 'rejected';
      })
      .addCase(productsCreate.pending, (state, action) => {
        state.createStatus = 'pending';
      })
      .addCase(productsCreate.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.createStatus = 'success';
      })
      .addCase(productsCreate.rejected, (state, action) => {
        state.createStatus = 'rejected';
      })
      .addCase(productDelete.pending, (state, action) => {
        state.deleteStatus = 'pending';
      })
      .addCase(productDelete.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item._id !== action.payload._id
        );
        state.deleteStatus = 'success';
      })
      .addCase(productDelete.rejected, (state, action) => {
        state.deleteStatus = 'rejected';
      })
      .addCase(productsEdit.pending, (state, action) => {
        state.editStatus = 'pending';
      })
      .addCase(productsEdit.fulfilled, (state, action) => {
        state.items = state.items.map((product) =>
          product._id === action.payload._id ? action.payload : product
        );
        state.editStatus = 'success';
      })
      .addCase(productsEdit.rejected, (state, action) => {
        state.editStatus = 'rejected';
      });
  },
});

export default productsSlice.reducer;
