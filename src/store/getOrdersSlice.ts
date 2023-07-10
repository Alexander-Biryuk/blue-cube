import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { numberOfOrdersPerPage } from '../components/constants/constants';
import type { Busket } from '../types';

interface Orders {
  meta: {
    count: number;
    total: number;
  };
  data: Busket[][];
}
interface InitialState {
  orders: Orders;
  isLoading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  orders: {
    meta: {
      count: 0,
      total: 0,
    },
    data: [],
  },
  isLoading: false,
  error: null,
};

export const getOrders = createAsyncThunk<Orders, number, { rejectValue: string }>(
  'orders/getOrders',
  async (page, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: 'get',
        timeout: 5000,
        url: `https://skillfactory-task.detmir.team/orders?page=${page}&limit=${numberOfOrdersPerPage}`,
        headers: {
          Accept: 'application/json',
        },
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

const getOrdersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders.meta = action.payload.meta;
        state.orders.data = action.payload.data;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'get orders error ';
      });
  },
});

export default getOrdersSlice.reducer;
