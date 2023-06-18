//-------------this is reducer for additional fetching of product description----------------

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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
    const response = await fetch(`https://skillfactory-task.detmir.team/products/${id}`);

    if (!response.ok) {
      return rejectWithValue('Server Error!');
    }

    const data = response.json();
    console.log(data);
    return data;
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
      .addCase(fetchDescription.rejected, (state) => {
        state.loading = false;
        state.error = 'Error';
        console.log('error')
      });
  },
});

export default getProductsSlice.reducer;
