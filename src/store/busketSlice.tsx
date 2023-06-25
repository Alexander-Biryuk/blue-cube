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
  createdAt: string;
}

const initialState: Busket[] = [];

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
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(update),
    });
    if (!response.ok) {
      rejectWithValue('Server Error');
    }
    const data = response.json();
    return data;
  }
);

export const getCart = createAsyncThunk<Busket[], undefined, { rejectValue: string }>(
  'busket/getCart',
  async function (_, { rejectWithValue }) {
    const response = await fetch('https://skillfactory-task.detmir.team/cart');

    if (!response.ok) {
      rejectWithValue('Server Error');
    }

    const data = response.json();
    return data;
  }
);

const busketSlice = createSlice({
  name: 'busket',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Data>) => {
      if (state.find((item) => item.product.id === action.payload.id)) {
        const index = state.findIndex((item) => item.product.id === action.payload.id);
        state[index].quantity++;
      } else {
        state.push({ product: action.payload, quantity: 1, createdAt: '' });
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const indexOfRemoveElement = state.findIndex((item) => item.product.id === action.payload);
      if (state[indexOfRemoveElement].quantity > 0) {
        state[indexOfRemoveElement].quantity--;
      } else {
        state.splice(indexOfRemoveElement, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateCart.pending, () => {
        console.log('created at');
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(getCart.pending, () => {
        console.log('get cart pending');
      })
      .addCase(getCart.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(getCart.rejected, () => {
        console.log('get cart rejected');
      });
  },
});

export const { addToCart, removeFromCart } = busketSlice.actions;
export default busketSlice.reducer;
