import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { numberOfProductsPerPage } from '../components/constants/constants';

interface Products {
  meta: {
    count: number;
    total: number;
  };
  data: [
    {
      id: string;
      category: string;
      title: string;
      description: string;
      price: number;
      picture: string;
      rating: number;
    }
  ];
}

interface ProductsState {
  products: Products;
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: {
    meta: {
      count: 0,
      total: 0,
    },
    data: [
      {
        id: '',
        category: '',
        title: '',
        description: '',
        price: 0,
        picture: '',
        rating: 0,
      },
    ],
  },
  loading: false,
  error: null,
};
//------------------get state from ssessionStirage (for restore scroll position)--------------------
// const storedState = sessionStorage.getItem('store');
// if (storedState) {
//   // initialState = JSON.parse(storedState)
//   console.log(JSON.parse(storedState));
// }
//-------------------------------------------------------------------

export const fetchProducts = createAsyncThunk<Products, number, { rejectValue: string }>(
  'products/fetchProducts',
  async function (page, { rejectWithValue }) {
    try {
      const response = await axios.get(
        `https://skillfactory-task.detmir.team/products?page=${page}&limit=${numberOfProductsPerPage}`,
        { timeout: 5000, withCredentials: true }
      );
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        return axiosError.message;
      } else if (axiosError.request) {
        return rejectWithValue('No response from server');
      } else {
        return rejectWithValue('Bad request');
      }
    }
  }
);

const getProductsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // getProducts(state, action) {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;

        //---------------saving all new data to store for infinite scroll------------------------
        // if (state.products.meta.count === 0) {
        //   state.products = action.payload;
        // } else {
        //   // state.products.data = [...state.products.data, ...action.payload.data]
        //   state.products = {
        //     ...state.products,
        //     data: [...state.products.data, ...action.payload.data],
        //   };
        //   sessionStorage.setItem('store', JSON.stringify(state.products))
        // }
        //-------------------------------------------------------
        // sessionStorage.setItem('store', JSON.stringify(state.products))
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.error = 'Error';
      });
  },
});

// export const { getProducts } = getProductsSlice.actions;
export default getProductsSlice.reducer;
