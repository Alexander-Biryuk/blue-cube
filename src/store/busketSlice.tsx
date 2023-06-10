import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Busket {
  id: string;
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
  createdAt: string;
  submitted: boolean;
}
interface Data {
  id: string;
  category: string;
  title: string;
  description: string;
  price: number;
  picture: string;
  rating: number;
}

const initialState: Busket = {
  id: '',
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
  createdAt: '',
  submitted: false,
};

// const initialState = {} as Busket;

const busketSlice = createSlice({
  name: 'busket',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Data>) => {
      state.data.push(action.payload);
      console.log(state.data);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const indexOfRemoveElement = state.data.findIndex(item => item.id === action.payload);
      state.data.splice(indexOfRemoveElement, 1);
      console.log('remove', action.payload);
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase;
  // },
});

export const { addToCart, removeFromCart } = busketSlice.actions;
export default busketSlice.reducer;
