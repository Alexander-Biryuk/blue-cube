import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

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
    const response = await fetch('https://skillfactory-task.detmir.team/cart/submit', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: '',
    });

    if (!response.ok) {
      rejectWithValue('Server Error');
    }

    const data: Busket[] = await response.json();

    return data;
  }
);

export const getOrders = createAsyncThunk<Orders, number, { rejectValue: string }>(
  'orders/getOrders',
  async (page, { rejectWithValue }) => {
    const response = await fetch(`https://skillfactory-task.detmir.team/orders?page=1&limit=10`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    });

    if (!response.ok) {
      rejectWithValue('Server Error');
    }

    const data: Orders = await response.json();
    console.log('Response Data:', data);
    return data;
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    // addToOrderList: (state, action) => {
    //   state.push(action.payload)
    // },
    // getOrdersList: (state) => {
    //   return state
    // }
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitCart.pending, (state, action) => {
        return action.payload;
      })
      .addCase(submitCart.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(getOrders.pending, (state, action) => {
        console.log('pending get orders');
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        console.log('payload', action.payload);
        state.meta = action.payload.meta;
        state.data.push(...action.payload.data);
      });
  },
});

// export const {addToOrderList, getOrdersList} = ordersSlice.actions;
export default ordersSlice.reducer;
