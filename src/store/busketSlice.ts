import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import type { GoodType, Busket } from '../types';

interface InitialState {
  busket: Busket[];
  isLoading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  busket: [],
  isLoading: false,
  error: null,
};

export const updateCart = createAsyncThunk<Busket[], Busket[], { rejectValue: string }>(
  'busket/updateCart',
  async function (busket, { rejectWithValue }) {
    const update = busket
      ? {
          data: busket.map((item) => {
            return {
              id: item.product.id,
              quantity: item.quantity,
            };
          }),
        }
      : [];
    try {
      const response = await axios({
        method: 'post',
        url: 'https://skillfactory-task.detmir.team/cart/update',
        timeout: 5000,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        withCredentials: true,
        data: JSON.stringify(update),
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

export const getCart = createAsyncThunk<Busket[], undefined, { rejectValue: string }>(
  'busket/getCart',
  async function (_, { rejectWithValue }) {
    try {
      const response = await axios.get('https://skillfactory-task.detmir.team/cart', {
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

const busketSlice = createSlice({
  name: 'busket',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<GoodType>) => {
      if (!state.error)
        if (state.busket.find((item) => item.product.id === action.payload.id)) {
          const index = state.busket.findIndex((item) => item.product.id === action.payload.id);
          state.busket[index].quantity++;
        } else {
          state.busket.push({ product: action.payload, quantity: 1, createdAt: '' });
        }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const indexOfRemoveElement = state.busket.findIndex(
        (item) => item.product.id === action.payload
      );
      if (state.busket[indexOfRemoveElement].quantity > 0) {
        state.busket[indexOfRemoveElement].quantity--;
      } else {
        state.busket.splice(indexOfRemoveElement, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCart.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Update error';
      })
      .addCase(getCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.busket = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'get cart error';
      });
  },
});

export const { addToCart, removeFromCart } = busketSlice.actions;
export default busketSlice.reducer;
