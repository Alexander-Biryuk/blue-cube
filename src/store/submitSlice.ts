import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import type { Busket } from '../types';

interface InitialState {
  submitting: boolean;
  error: string | null;
}

const initialState: InitialState = {
  submitting: false,
  error: null,
};

export const submitCart = createAsyncThunk<Busket[], undefined, { rejectValue: string }>(
  'orders/submitCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: 'post',
        timeout: 5000,
        url: 'https://skillfactory-task.detmir.team/cart/submit',
        headers: {
          Accept: 'application/json',
        },
        data: '',
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

const submitSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitCart.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(submitCart.fulfilled, (state) => {
        state.submitting = false;
        state.error = null;
      })
      .addCase(submitCart.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload || 'submit error';
      });
  },
});

export default submitSlice.reducer;
