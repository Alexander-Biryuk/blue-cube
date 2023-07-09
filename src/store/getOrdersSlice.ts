import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { numberOfOrdersPerPage } from '../components/constants/constants';

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

interface InitialState {
  orders: Orders;
  isLoading: boolean;
  error: string | null;
}

// const initialState: Orders = {
//   meta: {
//     count: 0,
//     total: 0,
//   },
//   data: [],
// };

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
        withCredentials: true
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
  reducers: {
    // addToOrderList: (state, action) => {
    //   state.data.push(action.payload);
    //   state.meta.count++;
    //   // state.meta.total++;
    // },
    // getOrdersList: (state) => {
    //   return state;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
        console.log(action.payload);
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        console.log('payload', action.payload);
        state.orders.meta = action.payload.meta;
        // state.orders.data.push(...action.payload.data);
        state.orders.data = action.payload.data;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getOrders.rejected, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.error = action.payload || 'get orders error ';
      });
  },
});

// export const { addToOrderList, getOrdersList } = ordersSlice.actions;
export default getOrdersSlice.reducer;
