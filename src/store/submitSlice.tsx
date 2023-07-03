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

interface InitialState {
  // orders: Busket[],
  submitting: boolean,
  error: string | null
}

const initialState: InitialState = {
  // orders: [],
  submitting: false,
  error: null
}
// const initialState: Busket[] = [];


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

const submitSlice = createSlice({
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
      .addCase(submitCart.pending, (state, action) => {
        state.submitting = true;
        state.error = null;
        console.log(action.payload);
      })
      .addCase(submitCart.fulfilled, (state, action) => {
        state.submitting = false;
        state.error = null;
        console.log(action.payload);
      })
      .addCase(submitCart.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload || 'submit error';
        console.log(action.payload);
      });
  },
});

// export const { addToOrderList, getOrdersList } = ordersSlice.actions;
export default submitSlice.reducer;
