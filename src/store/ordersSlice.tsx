import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

interface Data {
  id: string;
  category: string;
  title: string;
  description: string;
  price: number;
  picture: string;
  rating: number;
}
interface Busket {
  product: Data;
  quantity: number;
  createdAt: string;
}

interface Orders {
  meta: {
    count: number;
    total: number;
  };
  data: Busket[][];
}

const initialState: Orders = {
  meta: {
    count: 0,
    total: 0,
  },
  data: [],
};

export const submitCart = createAsyncThunk<Busket[], undefined, { rejectValue: string }>(
  'orders/submitCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: 'post',
        url: 'https://skillfactory-task.detmir.team/cart/submit',
        headers: {
          Accept: 'application/json',
        },
        data: '',
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

export const getOrders = createAsyncThunk<Orders, number, { rejectValue: string }>(
  'orders/getOrders',
  async (page, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: 'get',
        url: `https://skillfactory-task.detmir.team/orders?page=${page}&limit=10`,
        headers: {
          Accept: 'application/json',
        },
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

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addToOrderList: (state, action) => {
      state.data.push(action.payload);
      state.meta.count++;
      // state.meta.total++;
    },
    getOrdersList: (state) => {
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitCart.pending, (state, action) => {
        console.log(action.payload);
      })
      .addCase(submitCart.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(submitCart.rejected, (state, action) => {
        console.log(action.payload);
      })
      .addCase(getOrders.pending, (state, action) => {
        console.log(action.payload);
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        console.log('payload', action.payload);
        state.meta = action.payload.meta;
        state.data.push(...action.payload.data);
      })
      .addCase(getOrders.rejected, (state, action) => {
        console.log(action.payload)
      })
  },
});

export const { addToOrderList, getOrdersList } = ordersSlice.actions;
export default ordersSlice.reducer;
