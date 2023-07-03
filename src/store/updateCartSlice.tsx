import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

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
  // createdAt: string;
}

interface InitialState {
  busket: Busket[];
  updating: boolean;
  error: null;
}

// const initialState: Busket[] = [];

const initialState: InitialState = {
  busket: [],
  updating: false,
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
    const response = await fetch('https://skillfactory-task.detmir.team/cart/update', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(update),
    });
    if (!response.ok) {
      rejectWithValue('Server Error');
    }
    const data = await response.json();
    return data;
  }
);

const busketSlice = createSlice({
  name: 'busket',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Data>) => {
      if (!state.error) {

        if (state.busket.find((item) => item.product.id === action.payload.id)) {
          const index = state.busket.findIndex((item) => item.product.id === action.payload.id);
          state.busket[index].quantity++;
        } else {
          // state.busket.push({ product: action.payload, quantity: 1, createdAt: '' });
          state.busket.push({ product: action.payload, quantity: 1});
        }
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const indexOfRemoveElement = state.busket.findIndex((item) => item.product.id === action.payload);
      if (state.busket[indexOfRemoveElement].quantity > 0) {
        state.busket[indexOfRemoveElement].quantity--;
      } else {
        state.busket.splice(indexOfRemoveElement, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateCart.pending, (state, action) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.updating = false;
        state.error = null;
      })
      .addCase(updateCart.rejected, (state, action) => {
        console.log(action.error);
      });
  },
});

// export const { addToCart, removeFromCart } = busketSlice.actions;
export default busketSlice.reducer;
