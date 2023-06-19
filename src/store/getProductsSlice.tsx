import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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
    const response = await fetch(
      `https://skillfactory-task.detmir.team/products?page=${page}&limit=15`
    );

    if (!response.ok) {
      return rejectWithValue('Server Error!');
    }

    const data = response.json();
    return data;
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
