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

const busketSlice = createSlice({
  name: 'busket',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.data.push(action.payload);
      console.log(state.data);
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase;
  // },
});

export const {addToCart} = busketSlice.actions;
export default busketSlice.reducer;
