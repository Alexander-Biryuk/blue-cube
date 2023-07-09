//-------------this is reducer for additional fetching of product description----------------

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

interface Description {
  //  data:  {
  id: string;
  category: string;
  title: string;
  description: string;
  price: number;
  picture: string;
  rating: number;
  // }
}

interface DescriptionState {
  data: Description;
  loading: boolean;
  error: string | null;
}

const initialState: DescriptionState = {
  data: {
    id: '',
    category: '',
    title: '',
    description: '',
    price: 0,
    picture: '',
    rating: 0,
  },
  loading: false,
  error: null,
};

export const fetchDescription = createAsyncThunk<Description, number, { rejectValue: string }>(
  'description/fetchDescription',
  async function (id, { rejectWithValue }) {
    try {
      const response = await axios.get(`https://skillfactory-task.detmir.team/products/${id}`, {
        timeout: 5000,
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        return rejectWithValue(axiosError.message);
      } else if (axiosError.request) {
        return rejectWithValue('No response from server');
      } else {
        return rejectWithValue('Bad request');
      }
    }
  }
);

const getProductsSlice = createSlice({
  name: 'description',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchDescription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDescription.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchDescription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'get product description error';
      });
  },
});

export default getProductsSlice.reducer;
